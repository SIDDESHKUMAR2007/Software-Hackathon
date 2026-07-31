import urllib.request
import zipfile
import os
import shutil

url = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip"
zip_path = os.path.join(os.environ["TEMP"], "node20.zip")
target_dir = os.path.join(os.environ["LOCALAPPDATA"], "nodejs")

print("Downloading Node.js v20...")
urllib.request.urlretrieve(url, zip_path)
print("Download completed! Extracting archive...")

extract_dir = os.path.join(os.environ["TEMP"], "node_out")
if os.path.exists(extract_dir):
    shutil.rmtree(extract_dir, ignore_errors=True)

with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(extract_dir)

extracted_folder = os.path.join(extract_dir, "node-v20.18.0-win-x64")

if os.path.exists(target_dir):
    shutil.rmtree(target_dir, ignore_errors=True)

shutil.move(extracted_folder, target_dir)
print("SUCCESS: Node.js & NPM installed at", target_dir)
