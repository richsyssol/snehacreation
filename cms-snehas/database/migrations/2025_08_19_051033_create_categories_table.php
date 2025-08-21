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
        Schema::create('categories', function (Blueprint $table) {
        $table->id();
        
        // English fields
        $table->string('name_en');
        $table->text('description_en')->nullable();
        
        // Marathi fields
        $table->string('name_mr');
        $table->text('description_mr')->nullable();
        
        // Common fields
        $table->string('slug')->unique();
        $table->string('image')->nullable();
        $table->boolean('is_active')->default(true);
        $table->timestamps();
        $table->softDeletes();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
