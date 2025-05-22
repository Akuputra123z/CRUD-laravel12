// posts/create.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Posts',
    href: '/Posts',
  },
];

export default function Posts() {
  const { data, setData, errors, post, reset, processing } = useForm({
    title: '',
    content: '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('posts.store'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Posts" />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Blog Posts</h1>
        </div>

        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Post</h2>
          <form onSubmit={submit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="name"
                name="title"
                value={data.title}
                onChange={(e) => setData('title', e.currentTarget.value)}
                placeholder="Post Name"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
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
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {processing ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}