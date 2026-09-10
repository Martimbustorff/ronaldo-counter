from pathlib import Path
import argparse
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from s360_stats.core import load_json, dump_json, build_discipline_snapshot


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--season", default="2026-27")
    p.add_argument("--target-games", type=int, required=True)
    p.add_argument("--as-of", required=True)
    args = p.parse_args()

    cfg = load_json(ROOT / "config" / f"season-{args.season}.json")
    data_root = ROOT / "data" / f"season-{args.season}"
    baseline = load_json(data_root / "discipline" / "baseline-005.json")
    matches = load_json(data_root / "discipline" / "matches.json")
    snapshot = build_discipline_snapshot(cfg, baseline, matches, args.target_games, args.as_of)
    out = data_root / "discipline" / "snapshots" / f"{args.target_games:03d}.json"
    dump_json(snapshot, out)
    print(out)
    if not snapshot["publishable"]:
        for reason in snapshot["blocking_reasons"]:
            print(f"BLOCKED: {reason}", file=sys.stderr)
        raise SystemExit(2)


if __name__ == "__main__":
    main()
