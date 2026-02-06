import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import List "mo:core/List";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Time "mo:core/Time";

actor {
  type ImageGalleryMetadata = {
    id : Nat;
    title : Text;
    description : Text;
    sortOrder : Nat;
    imageRef : Storage.ExternalBlob;
    timestamp : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  let imagesList = List.empty<ImageGalleryMetadata>();
  let accessControlState = AccessControl.initState();
  let userProfiles = Map.empty<Principal, UserProfile>();
  
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin Management
  public query ({ caller }) func getCurrentAdmin() : async Principal {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view admin information");
    };
    caller;
  };

  // Image Gallery Management - Admin Only

  // Create Image Gallery
  public shared ({ caller }) func uploadImage(image : Storage.ExternalBlob, title : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload images");
    };

    let newId = imagesList.size() + 1;

    let newImageMetadata : ImageGalleryMetadata = {
      id = newId;
      title;
      description;
      sortOrder = newId;
      imageRef = image;
      timestamp = Time.now();
    };

    imagesList.add(newImageMetadata);
  };

  // Update Image Metadata
  public shared ({ caller }) func updateImageMetadata(imageId : Nat, newTitle : Text, newDescription : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update images");
    };

    let updatedList = imagesList.map<ImageGalleryMetadata, ImageGalleryMetadata>(
      func(image) {
        if (image.id == imageId) {
          { image with title = newTitle; description = newDescription };
        } else {
          image;
        };
      }
    );
    imagesList.clear();
    imagesList.addAll(updatedList.values());
  };

  // Delete Image
  public shared ({ caller }) func deleteImage(imageId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete images");
    };

    let initialLength = imagesList.size();
    let filteredList = imagesList.filter(func(image) { image.id != imageId });

    if (filteredList.size() == initialLength) {
      Runtime.trap("Image with id " # Nat.toText(imageId) # " not found");
    } else {
      imagesList.clear();
      imagesList.addAll(filteredList.values());
    };
  };

  // Reorder Images
  public shared ({ caller }) func reorderImages(imageIds : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reorder images");
    };

    let imagesArray = imagesList.toArray();
    
    if (imageIds.size() != imagesArray.size()) {
      Runtime.trap("Invalid reorder: number of IDs must match number of images");
    };

    let updatedList = List.empty<ImageGalleryMetadata>();
    var newSortOrder = 1;

    for (imageId in imageIds.vals()) {
      let imageOpt = imagesArray.find(func(img : ImageGalleryMetadata) : Bool { img.id == imageId });
      switch (imageOpt) {
        case (?image) {
          let reorderedImage = {
            image with sortOrder = newSortOrder;
          };
          updatedList.add(reorderedImage);
          newSortOrder += 1;
        };
        case (null) {
          Runtime.trap("Invalid reorder: image ID " # Nat.toText(imageId) # " not found");
        };
      };
    };

    imagesList.clear();
    imagesList.addAll(updatedList.values());
  };

  // Get Images (Public Query - No Authorization Required)
  public query func getImagesForDisplay() : async [ImageGalleryMetadata] {
    let sortedImages = imagesList.toArray();
    // Sort by sortOrder
    Array.sort<ImageGalleryMetadata>(
      sortedImages,
      func(a, b) {
        if (a.sortOrder < b.sortOrder) { #less }
        else if (a.sortOrder > b.sortOrder) { #greater }
        else { #equal };
      },
    );
  };
};
