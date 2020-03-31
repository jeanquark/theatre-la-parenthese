<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Page;
use File;
use Illuminate\Support\Facades\Storage;

class PagesController extends Controller
{
    public function getPages()
    {
        $pages = Page::all();

        return response()->json([
            'success' => true,
            'pages' => $pages
        ], 200);
    }

    public function getPageBySlug (Request $request, $slug)
    {
        // $page = null;
        // $page = Page::where('slug', '=', 'accueil')->first();
        // if (strlen($id) = 1) {
        //     // $page = Page::find($id);
            // $page = Page::where('id', '=', '5')->first();

        // } else {
            $page = Page::where('slug', '=', $slug)->first();
        //     // $page = Page::all();
        // }

        return response()->json([
            'success' => true,
            'page' => $page,
            'slug' => $slug
        ], 200);
    }

    protected function create(Request $request)
    {
        $page = json_decode($request->form);

        // return response()->json([
        //     'success' => true,
        //     'request->payload' => $request->payload,
        // ], 201);

        $newPage = new Page;

        $newPage->title = $page->title;
        $newPage->slug = str_slug($page->title);
        $newPage->content = $page->content;

        $newPage->save();
  
        return response()->json([
            'success' => true,
            'page' => $page,
            'newPage' => $newPage,
        ], 201);
    }

    protected function update(Request $request, $slug)
    {
        $updatedPage = $request->updatedPage;

        // return response()->json([
        //     'success' => true,
        //     '$slug' => $slug,
        //     '$updatedPage' => $updatedPage,
        // ], 200);

        $sanitizedUpdatedPage = str_replace('../../../', '/', $updatedPage['content']);

        // $updatePage = Page::updateOrInsert(
        //     [
        //         'slug' => $updatedPage['slug']
        //     ],
        //     [
        //         // 'page' => $updatedPage['page'],
        //         'content' => $sanitizedUpdatedPage,
        //         'updated_at' => \Carbon\Carbon::now()
        //     ]
        // );

        $updatePage = Page::where('slug', '=', $updatedPage['slug'])->update(
            [
                'slug' => $updatedPage['slug'],
                'title' => $updatedPage['title'],
                'content' => $sanitizedUpdatedPage,
                'updated_at' => \Carbon\Carbon::now()
            ]
        );

        $page = Page::where('slug', '=', $updatedPage['slug'])->first();

        return response()->json([
            'success' => true,
            // '$request->updatedPage' => $request->updatedPage,
            // '$abc' => $abc,
            // 'slug' => $slug,
            // 'updatedPage' => $updatedPage,
            // 'sanitizedUpdatedPage' => $sanitizedUpdatedPage,
            // 'updatePage' => $updatePage,
            'page' => $page
        ], 200);
    }

    protected function delete($id)
    {
        $page = Page::where('id', '=', $id)->first();
        $page->delete();

        return response()->json([
            'success' => false,
            'page' => $page
        ], 200);
    }

    protected function getImages () 
    {
        $images = Storage::disk('images')->allfiles('pages');

        return response()->json([
            'success' => true,
            'images' => $images
        ], 200);
    }

    protected function uploadImage(Request $request)
    {
        $validatedData = $request->validate([
            'file' => 'required|file',
        ]);


        // Upload image if present
        if (File::exists($request->file)) {
            $file = $request->file->getClientOriginalName(); //Get Image Name
            // $extension = $request->file->getClientOriginalExtension();  //Get Image Extension
            // $fileName = $file.'.'.$extension;  //Concatenate both to get FileName (eg: file.jpg)

            // $uploadedFile = Storage::disk('images')->put('pages', $request->file);
            $uploadedFile = Storage::disk('images')->putFileAs('pages', $request->file, $file);

        }

        return response()->json([
            'success' => true,
            'file' => $file,
            'location' => $uploadedFile
        ], 200);
    }
}
