<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('product_code')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(50),
                            
                        Forms\Components\Select::make('category_id')
                            ->relationship('category', 'name_en')
                            ->searchable()
                            ->preload()
                            ->required(),
                            
                        Forms\Components\TextInput::make('name_en')
                            ->label('Name (English)')
                            ->required()
                            ->maxLength(255),
                            
                        Forms\Components\TextInput::make('name_mr')
                            ->label('Name (Marathi)')
                            ->required()
                            ->maxLength(255),
                            
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                            
                        Forms\Components\Textarea::make('description_en')
                            ->label('Description (English)')
                            ->columnSpanFull(),
                            
                        Forms\Components\Textarea::make('description_mr')
                            ->label('Description (Marathi)')
                            ->columnSpanFull(),
                    ])->columns(2),
                    
                Forms\Components\Section::make('Pricing & Inventory')
                    ->schema([
                        Forms\Components\TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->prefix('₹'),
                            
                        Forms\Components\TextInput::make('cost_price')
                            ->numeric()
                            ->prefix('₹'),
                            
                        Forms\Components\TextInput::make('stock_quantity')
                            ->required()
                            ->numeric()
                            ->minValue(0),
                            
                        Forms\Components\TextInput::make('min_stock_threshold')
                            ->numeric()
                            ->minValue(0),
                            
                        Forms\Components\TextInput::make('sku')
                            ->unique(ignoreRecord: true)
                            ->maxLength(50),
                            
                        Forms\Components\TextInput::make('barcode')
                            ->maxLength(100),
                    ])->columns(3),
                    
                Forms\Components\Section::make('Media')
                    ->schema([
                        Forms\Components\FileUpload::make('images')
                            ->disk("public_uploads")
                            ->image()
                            ->multiple()
                            ->directory('products')
                            ->columnSpanFull(),
                    ]),
                    
                Forms\Components\Section::make('Specifications')
                    ->schema([
                        Forms\Components\KeyValue::make('specifications_en')
                            ->label('Specifications (English)')
                            ->columnSpan(1),
                            
                        Forms\Components\KeyValue::make('specifications_mr')
                            ->label('Specifications (Marathi)')
                            ->columnSpan(1),
                    ])->columns(2),
                    
                Forms\Components\Section::make('Status')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->default(true),
                            
                        Forms\Components\Toggle::make('is_featured'),
                        Forms\Components\Toggle::make('is_art_collection'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('images')
                    ->disk("public_uploads")
                    ->label('Image')
                    ->stacked()
                    ->circular()
                    ->limit(1),
                    
                Tables\Columns\TextColumn::make('product_code')
                    ->searchable(),
                    
                Tables\Columns\TextColumn::make('name_en')
                    ->label('Name (English)')
                    ->searchable(),
                    
                Tables\Columns\TextColumn::make('category.name_en')
                    ->label('Category'),
                    
                Tables\Columns\TextColumn::make('price')
                    ->money('INR')
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('stock_quantity')
                    ->numeric()
                    ->sortable(),
                    
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                    
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),
                    Tables\Columns\IconColumn::make('is_art_collection')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name_en'),
                Tables\Filters\TernaryFilter::make('is_active'),
                Tables\Filters\TernaryFilter::make('is_featured'),
                Tables\Filters\TernaryFilter::make('is_art_collection'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}