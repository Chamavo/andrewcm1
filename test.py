import json
with open('c:/Users/ACER/Downloads/Projets GitHub/Andrewcm1/src/data/maths/problems150.json', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if '"id": 51' in line or '"id":51' in line:
        for j in range(i, i+15):
            print(f'{j+1}: {lines[j].strip()}')
        break
