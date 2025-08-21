<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name_en',
        'name_mr',
        'description_en',
        'description_mr',
        'slug',
        'image',
        'is_active'
    ];

    protected $dates = ['deleted_at'];

    // Accessor for current locale name
    public function getNameAttribute()
    {
        $locale = app()->getLocale();
        $nameField = 'name_' . $locale;
        return $this->$nameField ?? $this->name_en;
    }

    // Accessor for current locale description
    public function getDescriptionAttribute()
    {
        $locale = app()->getLocale();
        $descField = 'description_' . $locale;
        return $this->$descField ?? $this->description_en;
    }

    // Relationship with products
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    // Get image URL
    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/'.$this->image) : null;
    }

    // Scope for active categories
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}