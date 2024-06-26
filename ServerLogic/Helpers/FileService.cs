﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace ServerLogic.Helpers;
public class FileService
{


    public (byte[],string,string) Load(string filename)
    {
        var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);

        var provider = new FileExtensionContentTypeProvider();
        if (!provider.TryGetContentType(filepath, out var contentType))
        {
            contentType = "application/octet-stream";
        }

        var bytes = File.ReadAllBytes(filepath);
        return (bytes, contentType, Path.GetFileName(filepath));

    }

    public string ResizeImage(string filename, int width = 400, int height = 400)
    {
        var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);
        using (Image image = Image.Load(exactpath))
        {
            image.Mutate(x => x.Resize(width, height));
            image.Save(exactpath);
        }

        return filename;
    }
    public string Write(IFormFile file)
    {
        string filename = "";
        try
        {
            var extension = "." + file.FileName.Split('.')[file.FileName.Split('.').Length - 1];
            filename = DateTime.Now.Ticks.ToString() + extension;

            var filepath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files");

            if (!Directory.Exists(filepath))
            {
                Directory.CreateDirectory(filepath);
            }

            var exactpath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\Files", filename);
            using (var stream = new FileStream(exactpath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return filename;
        }
        catch
        {
            throw;
        }
    }
}
