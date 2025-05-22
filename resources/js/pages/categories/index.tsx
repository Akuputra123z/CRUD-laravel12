// Categories/index.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: '/categories',
  },
];

interface CategoriesProps {
  categories: { id: number; name: string; description: string; slug: string; }[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories" />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Blog Categories</h1>
          <Link href="/categories/create">
            <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">
              Create
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          {categories.length > 0 ? (
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 text-left border-b">Name</th>
                  <th className="py-2 px-4 text-left border-b">Description</th>
                  <th className="py-2 px-4 text-left border-b">Slug</th>
                  <th className="py-2 px-4 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr className="hover:bg-gray-50" key={category.id}>
                    <td className="py-2 px-4 border-b">{category.name}</td>
                    <td className="py-2 px-4 border-b">{category.description}</td>
                    <td className="py-2 px-4 border-b">{category.slug}</td>

                    <td className="py-2 px-4 border-b">
                      <Link
                        href={`/categories/${category.id}/edit`}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                      >
                        Edit
                      </Link>
                      <Link
                        href={route('categories.destroy', category.id)}
                        method="delete"
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={(e) => {
                          if (!confirm('Are you sure?')) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">No categories found. Create a new category to get started.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

