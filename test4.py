import json

with open('c:/Users/ACER/Downloads/Projets GitHub/Andrewcm1/src/data/maths/problems150.json', 'r', encoding='utf-8') as f:
    problems = json.load(f)

fixes = {
    53: '6,25',
    59: '3h30',
    65: '13,5',
    74: '1/10',
    77: '7,50',
    82: '7h45'
}

for p in problems:
    if p['id'] in fixes:
        for q in p['questions']:
            q['response'] = fixes[p['id']]

with open('c:/Users/ACER/Downloads/Projets GitHub/Andrewcm1/src/data/maths/problems150.json', 'w', encoding='utf-8') as f:
    json.dump(problems, f, indent=4, ensure_ascii=False)
