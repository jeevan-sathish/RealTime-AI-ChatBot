from fastapi import FastAPI,WebSocket
import ollama

app =FastAPI()

@app.websocket('/ws')
async def websocket_endpoint(websocket:WebSocket):
    await websocket.accept()
    print("connected ✅")

    try:
        while True:
            data =await websocket.receive_text()
            print(data)
            prompt=f"ENSURE THE INFORMATION DOENT EXCEED MARE THAN 2 LINES {data}"
            response = ollama.chat(
                model="llama3",
                messages=[{"role":"user","content":prompt}],
                stream=True
            )

            for chunk in response:
                content = chunk["message"]["content"]

                await websocket.send_text(content)
            


            
    except Exception as e:
        print("error:",e)