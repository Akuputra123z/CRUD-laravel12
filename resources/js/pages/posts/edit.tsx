// posts/edit.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Posts',
    href: '/posts',
  },
];

interface PostsProps {
  post: { id: number; title: string; content: string };
}

export default function Posts({ post }: PostsProps) {
  const { data, setData, errors, put, reset, processing } = useForm({
    title: post.title,
    content: post.content,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    put(route('posts.update', post.id), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Post" />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Edit Post</h1>
        </div>

        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Edit Post</h2>
          <form onSubmit={submit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={(e) => setData('title', e.currentTarget.value)}
                placeholder="Post Title"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                  errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                aria-invalid={!!errors.title}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 font-medium mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={data.content}
                onChange={(e) => setData('content', e.currentTarget.value)}
                placeholder="Post Content"
                rows={4}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                  errors.content ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                aria-invalid={!!errors.content}
              ></textarea>
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {processing ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}