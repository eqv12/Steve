from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route("/")
def index():
    run_frames = sorted([f"assets/run/{f}" for f in os.listdir("static/assets/run")])
    jump_frames = sorted([f"assets/jump/{f}" for f in os.listdir("static/assets/jump")])
    
    # pass arrays to template
    return render_template("index.html", run_frames=run_frames, jump_frames=jump_frames)

if __name__ == "__main__":
    app.run(debug=True)
