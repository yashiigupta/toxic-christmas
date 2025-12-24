#!/bin/bash
BASE_URL="https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights"
DEST="public/models"

mkdir -p $DEST

files=(
  "ssd_mobilenetv1_model-weights_manifest.json"
  "ssd_mobilenetv1_model-shard1"
  "ssd_mobilenetv1_model-shard2"
  "face_expression_model-weights_manifest.json"
  "face_expression_model-shard1"
  "age_gender_model-weights_manifest.json"
  "age_gender_model-shard1"
  "face_landmark_68_model-weights_manifest.json"
  "face_landmark_68_model-shard1"
)

for file in "${files[@]}"; do
  echo "Downloading $file..."
  curl -L "$BASE_URL/$file" -o "$DEST/$file"
done

echo "Models downloaded!"
