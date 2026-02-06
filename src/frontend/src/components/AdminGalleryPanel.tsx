import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useGetGalleryImages,
  useUploadImage,
  useDeleteImage,
  useReorderImages,
  useIsCallerAdmin,
} from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SafeImage } from '@/components/SafeImage';
import { ExternalBlob } from '../backend';
import { Loader2, Upload, Trash2, ChevronUp, ChevronDown, LogIn, LogOut, AlertCircle, Shield } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export function AdminGalleryPanel() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: images, isLoading: imagesLoading } = useGetGalleryImages();
  const uploadMutation = useUploadImage();
  const deleteMutation = useDeleteImage();
  const reorderMutation = useReorderImages();

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      setError(null);
      await login();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
      if (err.message === 'User is already authenticated') {
        await clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file (JPEG or PNG)');
        return;
      }
      setUploadFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      setError('Please select an image file');
      return;
    }

    try {
      setError(null);
      setUploadProgress(0);

      const arrayBuffer = await uploadFile.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const imageBlob = ExternalBlob.fromBytes(uint8Array);

      await uploadMutation.mutateAsync({
        imageBlob,
        title: uploadTitle || 'Untitled',
        description: uploadDescription || '',
        onProgress: (percentage) => setUploadProgress(percentage),
      });

      // Reset form
      setUploadFile(null);
      setUploadTitle('');
      setUploadDescription('');
      setUploadProgress(0);
      
      // Reset file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
    }
  };

  const handleDelete = async (imageId: bigint) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      setError(null);
      await deleteMutation.mutateAsync(imageId);
    } catch (err: any) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete image');
    }
  };

  const handleMoveUp = async (index: number) => {
    if (!images || index === 0) return;

    const newOrder = [...images];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    
    try {
      setError(null);
      await reorderMutation.mutateAsync(newOrder.map((img) => img.id));
    } catch (err: any) {
      console.error('Reorder error:', err);
      setError(err.message || 'Failed to reorder images');
    }
  };

  const handleMoveDown = async (index: number) => {
    if (!images || index === images.length - 1) return;

    const newOrder = [...images];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    
    try {
      setError(null);
      await reorderMutation.mutateAsync(newOrder.map((img) => img.id));
    } catch (err: any) {
      console.error('Reorder error:', err);
      setError(err.message || 'Failed to reorder images');
    }
  };

  // Not authenticated - show login
  if (!isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Login
          </CardTitle>
          <CardDescription>
            Login with Internet Identity to manage the gallery
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Login with Internet Identity
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Authenticated but checking admin status
  if (isAdminLoading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  // Authenticated but not admin
  if (!isAdmin) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You are logged in as: {identity?.getPrincipal().toString().slice(0, 20)}...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              You do not have admin permissions to manage the gallery.
            </AlertDescription>
          </Alert>
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Admin panel
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Admin Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Admin Gallery Management
              </CardTitle>
              <CardDescription className="mt-2">
                Logged in as: {identity?.getPrincipal().toString().slice(0, 30)}...
              </CardDescription>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Image</CardTitle>
          <CardDescription>
            Add a new image to the gallery (JPEG or PNG)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Image File</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              disabled={uploadMutation.isPending}
            />
          </div>

          <div>
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="Enter image title"
              disabled={uploadMutation.isPending}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={uploadDescription}
              onChange={(e) => setUploadDescription(e.target.value)}
              placeholder="Enter image description"
              rows={3}
              disabled={uploadMutation.isPending}
            />
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!uploadFile || uploadMutation.isPending}
            className="w-full"
          >
            {uploadMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Gallery Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Gallery Images</CardTitle>
          <CardDescription>
            Reorder or delete images from the gallery
          </CardDescription>
        </CardHeader>
        <CardContent>
          {imagesLoading ? (
            <div className="py-12 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !images || images.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No images in gallery yet. Upload your first image above.
            </p>
          ) : (
            <div className="space-y-4">
              {images.map((image, index) => (
                <div
                  key={image.id.toString()}
                  className="flex items-center gap-4 p-4 border border-border rounded-lg"
                >
                  <SafeImage
                    src={image.imageRef.getDirectURL()}
                    alt={image.title}
                    className="w-24 h-24 object-cover rounded"
                    hideOnError
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{image.title}</h4>
                    {image.description && (
                      <p className="text-sm text-muted-foreground truncate">
                        {image.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || reorderMutation.isPending}
                      title="Move up"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === images.length - 1 || reorderMutation.isPending}
                      title="Move down"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(image.id)}
                      disabled={deleteMutation.isPending}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
