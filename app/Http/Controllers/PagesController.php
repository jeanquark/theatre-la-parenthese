<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PagesController extends Controller
{
    public function getPages()
    {
        $pages = Page::all();

        return response()->json($pages, 200);
    }

    public function getPageById(Request $request, $id)
    {
        $page = Page::findOrFail($id);

        return response()->json([
            'success' => true,
            'page' => $page,
        ], 200);
    }

    public function getPageBySlug (Request $request, $slug)
    {
        $page = Page::where('slug', '=', $slug)->first();

        return response()->json([
            'success' => true,
            'page' => $page,
            'slug' => $slug
        ], 200);
    }

    protected function createPage(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|unique:pages',
        ]);

        $page = new Page;

        $page->name = $request->name;
        $page->slug = str_slug($request->name);
        $page->content = $request->content;

        $page->save();

        $newPage = Page::find($page->id);

        return response()->json([
            'success' => true,
            'newPage' => $newPage,
        ], 201);
    }

    protected function updatePage(Request $request, $id)
    {

        $validatedData = $request->validate([
            'name' => ['required', Rule::unique('pages')->ignore($id)],
        ]);

        $page = Page::find($id);

        $page->updateOrCreate(
            ['id' => $id],
            [
                'name' => $request->name,
                'slug' => str_slug($request->name),
                'content' => $request->content,
                'is_published' => $request->is_published,
                'updated_at' => \Carbon\Carbon::now(),
            ]
        );

        $updatedPage = Page::find($id);

        return response()->json([
            'success' => true,
            'page' => $page,
            'updatedPage' => $updatedPage
        ], 201);
    }

    protected function deletePage(Request $request, $pageId)
    {
        $page = Page::find($pageId);

        // Delete image if exists
        if (Storage::disk('images')->exists('pages', $page->image)) {
            Storage::disk('images')->delete('pages', $page->image);
        }

        $page->delete();

        return response()->json([
            'success' => true,
            'page' => $page
        ], 204);
    }

    // protected function updatePage2(Request $request, $slug)
    // {
    //     $updatedPage = $request->updatedPage;

    //     // return response()->json([
    //     //     'success' => true,
    //     //     '$slug' => $slug,
    //     //     '$updatedPage' => $updatedPage,
    //     // ], 200);

    //     $sanitizedUpdatedPage = str_replace('../../../', '/', $updatedPage['content']);

    //     // $updatePage = Page::updateOrInsert(
    //     //     [
    //     //         'slug' => $updatedPage['slug']
    //     //     ],
    //     //     [
    //     //         // 'page' => $updatedPage['page'],
    //     //         'content' => $sanitizedUpdatedPage,
    //     //         'updated_at' => \Carbon\Carbon::now()
    //     //     ]
    //     // );

    //     $updatePage = Page::where('slug', '=', $updatedPage['slug'])->update(
    //         [
    //             'slug' => $updatedPage['slug'],
    //             'title' => $updatedPage['title'],
    //             'content' => $sanitizedUpdatedPage,
    //             'updated_at' => \Carbon\Carbon::now()
    //         ]
    //     );

    //     $page = Page::where('slug', '=', $updatedPage['slug'])->first();

    //     return response()->json([
    //         'success' => true,
    //         // '$request->updatedPage' => $request->updatedPage,
    //         // '$abc' => $abc,
    //         // 'slug' => $slug,
    //         // 'updatedPage' => $updatedPage,
    //         // 'sanitizedUpdatedPage' => $sanitizedUpdatedPage,
    //         // 'updatePage' => $updatePage,
    //         'page' => $page
    //     ], 200);
    // }

    // protected function deletePage2($id)
    // {
    //     $page = Page::where('id', '=', $id)->first();
    //     $page->delete();

    //     return response()->json([
    //         'success' => false,
    //         'page' => $page
    //     ], 200);
    // }

    // protected function getImages () 
    // {
    //     $images = Storage::disk('images')->allfiles('pages');

    //     return response()->json([
    //         'success' => true,
    //         'images' => $images
    //     ], 200);
    // }

    // protected function uploadImage(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'file' => 'required|file',
    //     ]);


    //     // Upload image if present
    //     if (File::exists($request->file)) {
    //         $file = $request->file->getClientOriginalName(); //Get Image Name
    //         // $extension = $request->file->getClientOriginalExtension();  //Get Image Extension
    //         // $fileName = $file.'.'.$extension;  //Concatenate both to get FileName (eg: file.jpg)

    //         // $uploadedFile = Storage::disk('images')->put('pages', $request->file);
    //         $uploadedFile = Storage::disk('images')->putFileAs('pages', $request->file, $file);

    //     }

    //     return response()->json([
    //         'success' => true,
    //         'file' => $file,
    //         'location' => $uploadedFile
    //     ], 200);
    // }
}
