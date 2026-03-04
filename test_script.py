import sys
import traceback
sys.path.append('/home/mederic/Ynov/M1/IA/IAMAR3/ModemAgency/antigravity-awesome-skills/skills/ui-ux-pro-max/scripts')
from design_system import generate_design_system

try:
    res = generate_design_system("luxury travel agency dark", "TimeTravel Agency", "markdown")
    print("RESULT LENGTH:", len(res))
    print(res)
except Exception as e:
    traceback.print_exc()
