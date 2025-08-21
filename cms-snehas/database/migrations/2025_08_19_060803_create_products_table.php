<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_code')->unique()->comment('Admin defined unique code');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('name_en');
            $table->string('name_mr');
            $table->string('slug')->unique();
            $table->text('description_en')->nullable();
            $table->text('description_mr')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('cost_price', 10, 2)->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->integer('min_stock_threshold')->default(5);
            $table->string('sku')->unique()->nullable();
            $table->string('barcode')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_art_collection')->default(false);
            $table->json('images')->nullable();
            $table->json('specifications_en')->nullable();
            $table->json('specifications_mr')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
