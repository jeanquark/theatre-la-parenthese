<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('guest');
    }

    public function getDocuments()
    {
        $files = array();
        $allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.ms-excel'];

        $rootDirectories = Storage::disk('documents')->directories();
        $rootFiles = Storage::disk('documents')->files();
        foreach ($rootFiles as $file) {
            $array = array();
            $fileType = Storage::disk('documents')->mimeType($file);

            if (in_array($fileType, $allowedFileTypes)) {
                array_push($array, $file);
                array_push($array, $fileType);
                array_push($array, Storage::disk('documents')->size($file));
                array_push($array, Storage::disk('documents')->lastModified($file));
                array_push($files, $array);
            }
        }

        return response()->json([
            'success' => true,
            'rootDirectories' => $rootDirectories,
            'rootFiles' => $rootFiles,
            'files' => $files,
        ], 200);
    }

    public function getDocumentsByFolder(Request $request)
    {
        $folder = $request->folder;
        $files = array();
        $allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.ms-excel'];

        $folders = Storage::disk('documents')->directories($folder);
        $folderFiles = Storage::disk('documents')->files($folder);

        foreach ($folderFiles as $file) {
            $array = array();
            $fileType = Storage::disk('documents')->mimeType($file);

            if (in_array($fileType, $allowedFileTypes)) {
                array_push($array, $file);
                array_push($array, $fileType);
                array_push($array, Storage::disk('documents')->size($file));
                array_push($array, Storage::disk('documents')->lastModified($file));
                array_push($files, $array);
            }
        }

        return response()->json([
            'success' => true,
            'folder' => $folder,
            'folders' => $folders,
            'files' => $files
        ], 200);
    }

    public function uploadDocument(Request $request)
    {
        $validatedData = $request->validate([
            'document' => 'required|file',
        ]);

        $newDocumentArray = array();

        // Upload document
        if (File::exists($request->document)) {
            $documentName = $request->document->getClientOriginalName(); //Get Document Name
            $uploadedFile = Storage::disk('documents')->putFileAs($request->path, $request->document, $documentName);

            array_push($newDocumentArray, $uploadedFile);
            array_push($newDocumentArray, Storage::disk('documents')->mimeType($uploadedFile));
            array_push($newDocumentArray, Storage::disk('documents')->size($uploadedFile));
            array_push($newDocumentArray, Storage::disk('documents')->lastModified($uploadedFile));
        }


        return response()->json([
            'success' => true,
            'request' => $request,
            'newDocumentArray' => $newDocumentArray,
        ], 200);
    }

    public function createFolder(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:32',
        ]);

        Storage::disk('documents')->makeDirectory($request->path . '/' . $request->name);

        return response()->json([
            'success' => true,
        ], 200);
    }

    public function deleteDocument(Request $request)
    {
        Storage::disk('documents')->delete($request->fileName);

        return response()->json([
            'success' => true,
            'request' => $request,
            // 'request->fileType' => $request->fileType,
            // 'request->fileName' => $request->fileName,
        ], 200);
    }

    public function deleteFolder(Request $request)
    {
        Storage::disk('documents')->deleteDirectory($request->folderName);

        return response()->json([
            'success' => true
        ], 200);
    }

}
