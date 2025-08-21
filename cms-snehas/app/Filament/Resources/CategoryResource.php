<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Filament\Resources\CategoryResource\RelationManagers;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
{
    return $form
        ->schema([
            Forms\Components\Section::make('Basic Information')
                ->schema([
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
                        
                    Forms\Components\FileUpload::make('image')
                        ->disk('public_uploads')
                        ->image()
                        ->directory('categories')
                        ->columnSpanFull(),
                ])->columns(2),
                
            Forms\Components\Section::make('Descriptions')
                ->schema([
                    Forms\Components\Textarea::make('description_en')
                        ->label('Description (English)')
                        ->columnSpan(1),
                        
                    Forms\Components\Textarea::make('description_mr')
                        ->label('Description (Marathi)')
                        ->columnSpan(1),
                ])->columns(2),
                
            Forms\Components\Toggle::make('is_active')
                ->default(true),
        ]);
}

public static function table(Table $table): Table
{
    return $table
        ->columns([
            Tables\Columns\ImageColumn::make('image')
                 ->disk('public_uploads')
                ->label('Image'),
                
            Tables\Columns\TextColumn::make('name_en')
                ->label('Name (English)')
                ->searchable(),
                
            Tables\Columns\TextColumn::make('name_mr')
                ->label('Name (Marathi)')
                ->searchable(),
                
            Tables\Columns\TextColumn::make('slug'),
                
            Tables\Columns\IconColumn::make('is_active')
                ->boolean(),
                
            Tables\Columns\TextColumn::make('created_at')
                ->dateTime()
                ->sortable()
                ->toggleable(isToggledHiddenByDefault: true),
        ])
        ->filters([
            Tables\Filters\TrashedFilter::make(),
            Tables\Filters\TernaryFilter::make('is_active'),
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
            'index' => Pages\ListCategories::route('/'),
            'create' => Pages\CreateCategory::route('/create'),
            'edit' => Pages\EditCategory::route('/{record}/edit'),
        ];
    }
}
