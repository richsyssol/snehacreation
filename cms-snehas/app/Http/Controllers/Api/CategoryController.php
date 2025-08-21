<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories with optional filters.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $categories = Category::query()
                ->when($request->has('is_active'), function ($query) use ($request) {
                    $query->where('is_active', $request->is_active);
                })
                ->when($request->has('search'), function ($query) use ($request) {
                    $locale = app()->getLocale();
                    $query->where("name_$locale", 'like', '%'.$request->search.'%');
                })
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Categories retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created category.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name_en' => 'required|string|max:255',
                'name_mr' => 'required|string|max:255',
                'description_en' => 'nullable|string',
                'description_mr' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'is_active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $data = $validator->validated();
            $data['slug'] = Str::slug($data['name_en']);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('categories', 'public');
                $data['image'] = $path;
            }

            $category = Category::create($data);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => 'Category created successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified category.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($identifier)
{
    // Try to find by ID first, then by slug
    $category = Category::where('id', $identifier)
                ->orWhere('slug', $identifier)
                ->first();

    if (!$category) {
        return response()->json([
            'success' => false,
            'message' => 'Category not found'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $category
    ]);
}

    /**
     * Update the specified category.
     *
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Category not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name_en' => 'sometimes|required|string|max:255',
                'name_mr' => 'sometimes|required|string|max:255',
                'description_en' => 'nullable|string',
                'description_mr' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'is_active' => 'boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $data = $validator->validated();

            if ($request->has('name_en')) {
                $data['slug'] = Str::slug($data['name_en']);
            }

            if ($request->hasFile('image')) {
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }
                $path = $request->file('image')->store('categories', 'public');
                $data['image'] = $path;
            }

            $category->update($data);

            return response()->json([
                'success' => true,
                'data' => $category,
                'message' => 'Category updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified category.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $category = Category::find($id);

            if (!$category) {
                return response()->json([
                    'success' => false,
                    'message' => 'Category not found'
                ], 404);
            }

            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }

            $category->delete();

            return response()->json([
                'success' => true,
                'message' => 'Category deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get only active categories
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function activeCategories()
    {
        try {
            $categories = Category::where('is_active', true)
                ->orderBy('name_'.app()->getLocale())
                ->get();

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Active categories retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve active categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get categories with products count
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function withProductsCount()
    {
        try {
            $categories = Category::withCount('products')
                ->orderBy('name_'.app()->getLocale())
                ->get();

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Categories with products count retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories with products count',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Search categories by name
     *
     * @param string $name
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchByName($name)
    {
        try {
            $locale = app()->getLocale();
            $categories = Category::where("name_$locale", 'like', "%$name%")
                ->get();

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Categories retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to search categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}