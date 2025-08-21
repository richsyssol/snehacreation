<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'product_code',
        'category_id',
        'name_en',
        'name_mr',
        'slug',
        'description_en',
        'description_mr',
        'price',
        'cost_price',
        'stock_quantity',
        'min_stock_threshold',
        'sku',
        'barcode',
        'is_active',
        'is_featured',
        'is_art_collection',
        'images',
        'specifications_en',
        'specifications_mr'
    ];

    protected $casts = [
        'images' => 'array',
        'specifications_en' => 'array',
        'specifications_mr' => 'array',
        'price' => 'decimal:2',
        'cost_price' => 'decimal:2',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'is_art_collection' => 'boolean',
    ];

    protected $dates = ['deleted_at'];

    // Accessors
    public function getNameAttribute()
    {
        $locale = app()->getLocale();
        return $this->{"name_$locale"} ?? $this->name_en;
    }

    public function getDescriptionAttribute()
    {
        $locale = app()->getLocale();
        return $this->{"description_$locale"} ?? $this->description_en;
    }

    public function getSpecificationsAttribute()
    {
        $locale = app()->getLocale();
        return $this->{"specifications_$locale"} ?? $this->specifications_en;
    }

    public function getImageUrlsAttribute()
    {
        if (empty($this->images)) {
            return [];
        }
        
        return array_map(function($image) {
            return asset('storage/'.$image);
        }, $this->images);
    }

    // Relationships
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeArt($query)
    {
        return $query->where('is_art_collection', true);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock_quantity', '>', 0);
    }
}