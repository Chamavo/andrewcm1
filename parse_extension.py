
import json
import re

INPUT_FILE = r"C:\Users\ACER\Downloads\Projets GitHub\andrewcm1\Pour aller plus loin.txt"
OUTPUT_FILE = r"C:\Users\ACER\Downloads\Projets GitHub\andrewcm1\src\data\maths\problems150.json"

def parse_extension_problems():
    return parse_extension_problems_v2()

def parse_extension_problems_v2():
    problems = []
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_category = "Pour aller plus loin"
    current_id = None
    current_text = []
    current_answer = []
    state = "CONTEXT" # CONTEXT, ANSWER
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        # IGNORE CATEGORY HEADERS entirely to keep uniform title
        if line.startswith("## 🔵"):
             continue
             
        if line.startswith("---"): continue
        
        ex_match = re.search(r'### \*\*Exercice (\d+)\*\*', line)
        if ex_match:
            # Save previous
            if current_id:
                # Clean text
                full_text = "\n".join(current_text).strip()
                ans_text = "\n".join(current_answer).strip()
                problems.append({
                    "id": current_id,
                    "title": current_category,
                    "part": 4,
                    "text": full_text,
                    "answer": ans_text
                })
            
            current_id = int(ex_match.group(1))
            current_text = []
            current_answer = []
            state = "CONTEXT"
            continue
            
        if current_id:
            # Check for question line
            if "**Question :" in line:
                # Extract question part
                q = line.replace("**Question :", "").replace("**", "").strip()
                current_text.append(q) # Add question to text
                state = "ANSWER" # Switch to answer mode
            elif "**Solution :**" in line:
                 state = "ANSWER"
                 # if content on same line?
                 ans = line.replace("**Solution :**", "").strip()
                 if ans: current_answer.append(ans)
            else:
                if state == "CONTEXT":
                    current_text.append(line)
                else:
                    current_answer.append(line)

    # Save last
    if current_id:
        full_text = "\n".join(current_text).strip()
        ans_text = "\n".join(current_answer).strip()
        problems.append({
            "id": current_id,
            "title": current_category,
            "part": 4,
            "text": full_text,
            "answer": ans_text
        })
        
    return problems

def merge_json(new_problems):
    try:
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        existing_data = []

    # Filter out any existing 151+ to replace them
    existing_data = [p for p in existing_data if p['id'] <= 150]
    
    # Add new ones
    existing_data.extend(new_problems)
    
    # Be sure to sort
    existing_data.sort(key=lambda x: x['id'])
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(existing_data, f, ensure_ascii=False, indent=4)
    
    print(f"Merged {len(new_problems)} new problems. Total: {len(existing_data)}")

if __name__ == "__main__":
    new_probs = parse_extension_problems()
    merge_json(new_probs)
