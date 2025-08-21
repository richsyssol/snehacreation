<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        try {
            $products = Product::query()
                ->with('category')
                ->when($request->has('category'), function($query) use ($request) {
                    $query->where('category_id', $request->category);
                })
                ->when($request->has('is_active'), function($query) use ($request) {
                    $query->where('is_active', $request->is_active);
                })
                ->when($request->has('is_featured'), function($query) use ($request) {
                    $query->where('is_featured', $request->is_featured);
                })
                ->when($request->has('is_art_collection'), function($query) use ($request) {
                    $query->where('is_art_collection', $request->is_art_collection);
                })
                ->when($request->has('search'), function($query) use ($request) {
                    $locale = app()->getLocale();
                    $query->where("name_$locale", 'like', '%'.$request->search.'%');
                })
                ->orderBy('created_at', 'desc')
                ->paginate($request->per_page ?? 15);

            return response()->json([
                'success' => true,
                'data' => $products,
                'message' => 'Products retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'product_code' => 'required|string|unique:products',
                'category_id' => 'required|exists:categories,id',
                'name_en' => 'required|string|max:255',
                'name_mr' => 'required|string|max:255',
                'description_en' => 'nullable|string',
                'description_mr' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'cost_price' => 'nullable|numeric|min:0',
                'stock_quantity' => 'required|integer|min:0',
                'min_stock_threshold' => 'nullable|integer|min:0',
                'sku' => 'nullable|string|unique:products',
                'barcode' => 'nullable|string',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'is_art_collection' => 'boolean',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'specifications_en' => 'nullable|json',
                'specifications_mr' => 'nullable|json',
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

            // Handle image uploads
            if ($request->hasFile('images')) {
                $imagePaths = [];
                foreach ($request->file('images') as $image) {
                    $path = $image->store('products', 'public');
                    $imagePaths[] = $path;
                }
                $data['images'] = $imagePaths;
            }

            $product = Product::create($data);

            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => 'Product created successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($identifier)
{
    try {
        // Try to find by ID first, then by slug
        $product = Product::with('category')
            ->where('id', $identifier)
            ->orWhere('slug', $identifier)
            ->first();

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $product,
            'message' => 'Product retrieved successfully'
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to retrieve product',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function update(Request $request, $id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'product_code' => 'sometimes|required|string|unique:products,product_code,'.$id,
                'category_id' => 'sometimes|required|exists:categories,id',
                'name_en' => 'sometimes|required|string|max:255',
                'name_mr' => 'sometimes|required|string|max:255',
                'description_en' => 'nullable|string',
                'description_mr' => 'nullable|string',
                'price' => 'sometimes|required|numeric|min:0',
                'cost_price' => 'nullable|numeric|min:0',
                'stock_quantity' => 'sometimes|required|integer|min:0',
                'min_stock_threshold' => 'nullable|integer|min:0',
                'sku' => 'nullable|string|unique:products,sku,'.$id,
                'barcode' => 'nullable|string',
                'is_active' => 'boolean',
                'is_featured' => 'boolean',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'specifications_en' => 'nullable|json',
                'specifications_mr' => 'nullable|json',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $data = $validator->validated();

            if (isset($data['name_en'])) {
                $data['slug'] = Str::slug($data['name_en']);
            }

            // Handle image uploads
            if ($request->hasFile('images')) {
                // Delete old images
                if ($product->images) {
                    foreach ($product->images as $image) {
                        Storage::disk('public')->delete($image);
                    }
                }
                
                $imagePaths = [];
                foreach ($request->file('images') as $image) {
                    $path = $image->store('products', 'public');
                    $imagePaths[] = $path;
                }
                $data['images'] = $imagePaths;
            }

            $product->update($data);

            return response()->json([
                'success' => true,
                'data' => $product,
                'message' => 'Product updated successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }

            // Delete associated images
            if ($product->images) {
                foreach ($product->images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }

            $product->delete();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function featuredProducts()
    {
        try {
            $products = Product::with('category')
                ->featured()
                ->active()
                ->inStock()
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $products,
                'message' => 'Featured products retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function search(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'query' => 'required|string|min:2',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $locale = app()->getLocale();
            $query = $request->input('query');

            $products = Product::with('category')
                ->where("name_$locale", 'like', "%$query%")
                ->orWhere("description_$locale", 'like', "%$query%")
                ->orWhere('product_code', 'like', "%$query%")
                ->orWhere('sku', 'like', "%$query%")
                ->orWhere('barcode', 'like', "%$query%")
                ->active()
                ->orderBy('created_at', 'desc')
                ->paginate($request->per_page ?? 15);

            return response()->json([
                'success' => true,
                'data' => $products,
                'message' => 'Search results retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to search products',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}