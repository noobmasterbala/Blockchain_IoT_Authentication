from flask import Flask, jsonify, request, render_template   
from pypuf.simulation import ArbiterPUF
from pypuf.io import random_inputs
import numpy as np
app = Flask(__name__)
app.secret_key = 'puf_Apsec_Key'

@app.route('/runpuf', methods=['POST'])
def pufapi():
    if not request.json:                                                        
        return jsonify({'error': 'no JSON data received'})
    x1=request.json.get("x1")
    x2=request.json.get("x2")
    x3=request.json.get("x3")
    
    if x1 > 100:
        mx1=1
    else:
        mx1=-1
    
    if x2 > 1000:
        mx2=1
    else:
        mx2=-1
    
    if x3 > 10000:
        mx3=1
    else:
        mx3=-1
    
    
    dno=request.json.get("dno")
    puf = ArbiterPUF(n=3, seed=(100+100*(dno)))
    inp = np.matrix([[x1,x2,x3],[mx3,mx2,mx1],[mx3,mx1,mx2]])
    
    returner={}
    pout=puf.eval(inp)
    pout=pout.tolist()
    
    if pout[0]==-1:
        pout[0] =0
    if pout[1]==-1:
        pout[1] =0
    if pout[2]==-1:
        pout[2] =0
    
        
    returner["y1"]=(pout[0])
    returner["y2"]=(pout[1])
    returner["y3"]=(pout[2])
    return returner

app.run(port=8000)