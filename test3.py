import json

with open('c:/Users/ACER/Downloads/Projets GitHub/Andrewcm1/src/data/maths/problems150.json', 'r', encoding='utf-8') as f:
    problems = json.load(f)

anomalies = []
for p in problems:
    for q in p.get('questions', []):
        ans = str(q.get('response', '')).strip()
        if ans:
            if ',' in ans or '.' in ans:
                pass
            elif ans.isdigit() or ans.replace('-', '').isdigit():
                # Missing fraction
                if '/' in p.get('answer', '') and '/' not in ans and 'fraction' in p.get('text', '').lower():
                    anomalies.append(p)
                # Missing decimal
                elif ',' in p.get('answer', '') and ',' not in ans and '.' not in ans and p.get('id') in [53, 59, 65, 77]:
                    anomalies.append(p)
                elif p.get('id') == 59 or p.get('id') == 53 or p.get('id') == 82:
                    anomalies.append(p)

dedup = {p['id']: p for p in anomalies}
print(f'Found {len(dedup)} anomalies')
with open('anomalies_repr.txt', 'w', encoding='utf-8') as f:
    json.dump(list(dedup.values()), f, indent=2, ensure_ascii=False)
