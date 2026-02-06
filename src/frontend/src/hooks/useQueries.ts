import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ImageGalleryMetadata } from '../backend';
import { ExternalBlob } from '../backend';

// Query to fetch gallery images for display
export function useGetGalleryImages() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<ImageGalleryMetadata[]>({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getImagesForDisplay();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

// Admin mutations
export function useUploadImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      imageBlob,
      title,
      description,
      onProgress,
    }: {
      imageBlob: ExternalBlob;
      title: string;
      description: string;
      onProgress?: (percentage: number) => void;
    }) => {
      if (!actor) throw new Error('Actor not available');
      
      const blobWithProgress = onProgress 
        ? imageBlob.withUploadProgress(onProgress)
        : imageBlob;
      
      await actor.uploadImage(blobWithProgress, title, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useDeleteImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteImage(imageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useReorderImages() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageIds: bigint[]) => {
      if (!actor) throw new Error('Actor not available');
      await actor.reorderImages(imageIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

export function useUpdateImageMetadata() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      imageId,
      title,
      description,
    }: {
      imageId: bigint;
      title: string;
      description: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.updateImageMetadata(imageId, title, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
    },
  });
}

// Check if caller is admin
export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
