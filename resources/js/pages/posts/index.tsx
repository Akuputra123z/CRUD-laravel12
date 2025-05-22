// posts/index.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Posts',
    href: '/Posts',
  },
];

interface PostsProps {
  posts: { id: number; title: string; content: string }[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Posts" />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">
            <Link href="/posts/create">Create</Link>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left border-b">Name</th>
                <th className="py-2 px-4 text-left border-b">Content</th>
                <th className="py-2 px-4 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr className="hover:bg-gray-50" key={post.id}>
                  <td className="py-2 px-4 border-b">{post.title}</td>
                  <td className="py-2 px-4 border-b">{post.content}</td>
                  <td className="py-2 px-4 border-b">
                    <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2">
                      <Link href={`/posts/${post.id}/edit`}>Edit</Link>
                    </button>
                    <Link
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      method="delete"
                      onClick={(e) => {
                        if (!confirm('Are you sure?')) {
                          e.preventDefault();
                        }
                      }}
                      href={route('posts.destroy', post.id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}

