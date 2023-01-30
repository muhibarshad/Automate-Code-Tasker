#!/usr/bin/bash

i=1
direc=~/Desktop/Lab
echo "How many total tasks in your Lab?"
read totaltasks
echo "Enter the language extension like for c++ enter \".cpp"\"
read extension
mkdir "$direc" && cd "$direc"

# Logic
while [ $totaltasks -ne 0 ];do
    touch "task$i$extension"
    echo "Enter the question # $i"
    read question
    echo "/* $question */" > "task$i$extension"
   # Make the API request
   response=$(curl -X POST -H "Content-Type: application/json" -d "{\"prompt\":\"$question\"}" http://localhost:3000/muhibGPT)


    echo "$response"
    echo "$response" >> task$i$extension
    totaltasks=$((totaltasks-1))
    i=$((i+1))
done

code $direc