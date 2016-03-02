#!/usr/bin/env python

from __future__ import with_statement
from contextlib import closing
from zipfile import ZipFile, ZIP_DEFLATED
import os

def zipdir(baseDir, archiveName, excludes):
    assert os.path.isdir(baseDir)
    with closing(ZipFile(archiveName, "w", ZIP_DEFLATED)) as zip:
        for root, dirs, files in os.walk(baseDir):
            dirs[:] = [d for d in dirs if d not in excludes]
            files[:] = [f for f in files if f not in excludes]
            
            for fileName in files:
                absoluteFileName = os.path.join(root, fileName)
                zipFileName = absoluteFileName[len(baseDir) + len(os.sep):]
                zip.write(absoluteFileName, zipFileName)

if __name__ == "__main__":
    baseDir = os.path.dirname(os.path.abspath(__file__))
    archiveName = "theme.zip"
    excludes = [
        ".git",
        "node_modules",
        "assets/src",
        ".bowerrc",
        ".editorconfig",
        ".gitignore",
        "bower.json",
        "gulpfile.js",
        "package.json",
        "README.md",
        os.path.relpath(__file__),
        archiveName,
    ]
    
    zipdir(baseDir, archiveName, excludes)
