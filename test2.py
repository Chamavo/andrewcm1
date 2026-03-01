import json

with open('c:/Users/ACER/Downloads/Projets GitHub/Andrewcm1/src/data/maths/problems150.json', 'r', encoding='utf-8') as f:
    problems = json.load(f)

anomalies = []
for p in problems:
    for q in p.get('questions', []):
        ans = str(q.get('response', '')).strip()
        if ans and ans.replace('-', '').isdigit():
            # Look for fractions when answer has a fraction
            if '/' in p.get('answer', '') and '/' not in ans:
                anomalies.append(p)
            # Look for decimals when answer has a decimal
            elif ',' in p.get('answer', '') and ',' not in ans and '.' not in ans:
                anomalies.append(p)
            # Look for hours when answer has 'h'
            elif 'h' in p.get('answer', '') and 'h' not in ans:
                anomalies.append(p)
            # Look for spaces in large numbers when answer has spaces
            elif ' ' in p.get('answer', '') and ' ' not in ans and len(ans) > 3:
                pass # maybe skip space formatting for now

print(f'Found {len(anomalies)} anomalies')
with open('anomalies_repr.txt', 'w', encoding='utf-8') as f:
    json.dump(anomalies, f, indent=2, ensure_ascii=False)
