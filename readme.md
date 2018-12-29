## How use it

### Params

--path - specify path to your folder on storage
--folder - folder name which we created
--count - files count on each sub folder (if we haven't sub folders, it will create files at root) (defauld - 100)
--folders_count - count of sub folders (default - 0)
--content_length - generated content length per each file

```--path``` and ```--folder``` params are required.

### Create a folder which contains top level files

```
node createFiles.js --path D:/temp --folder="my-test-folder"
```

### Create a folder which contains top level files

It will create 200 sub folders in "my-test-folder", folder names will be 0 - 199.
In each folder will be 200 files. Each file will contains 30000 symbols ASCII chars.

```
node createFiles.js --path D:/temp --folder="my-test-folder" folders_count=200 --count=200 --content_length=30000
```