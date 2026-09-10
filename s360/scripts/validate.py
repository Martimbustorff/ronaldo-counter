from pathlib import Path
import argparse
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from s360_stats.core import load_json, validate_discipline_dataset, build_discipline_snapshot


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--season", default="2026-27")
    args = parser.parse_args()

    cfg = load_json(ROOT / "config" / f"season-{args.season}.json")
    data_root = ROOT / "data" / f"season-{args.season}"
    baseline = load_json(data_root / "discipline" / "baseline-005.json")
    matches = load_json(data_root / "discipline" / "matches.json")

    errors = validate_discipline_dataset(matches, cfg)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        raise SystemExit(1)

    expected = load_json(data_root / "discipline" / "snapshots" / "005.json")
    generated = build_discipline_snapshot(cfg, baseline, matches, 5, expected.get("as_of"))
    if generated["clubs"] != expected["clubs"] or generated["publishable"] != expected["publishable"]:
        print("Snapshot 005 does not match the deterministic build.", file=sys.stderr)
        raise SystemExit(1)

    print("S360 validation OK")


if __name__ == "__main__":
    main()
