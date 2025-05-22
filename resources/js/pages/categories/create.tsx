// categories/create.tsx
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: '/categories',
  },
];

export default function Categories() {
  const { data, setData, errors, post, reset, processing } = useForm({
    name: '',
    description: '',
    slug: '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post(route('categories.store'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categories" />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Blog Categories</h1>
        </div>

        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Category</h2>
          <form onSubmit={submit}>
            {/* Input for Name */}
            <div className="mb-4">
             <Label title="name" />
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.currentTarget.value)}
                placeholder="Category Name"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                  errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Input for Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={data.description}
                onChange={(e) => setData('description', e.currentTarget.value)}
                placeholder="Category Description"
                rows={4}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                  errors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                aria-invalid={!!errors.description}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Input for Slug */}
            <div className="mb-4">
              <label htmlFor="slug" className="block text-gray-700 font-medium mb-1">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={data.slug}
                onChange={(e) => setData('slug', e.currentTarget.value)}
                placeholder="Category Slug"
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                  errors.slug ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
                aria-invalid={!!errors.slug}
              />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {processing ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}