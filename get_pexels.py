import urllib.request
import re

def get_pexels_video(query):
    url = f"https://www.pexels.com/search/videos/{query}/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        links = re.findall(r'https://videos\.pexels\.com/video-files/[^"]*\.mp4', html)
        return list(set(links))[:2]
    except Exception as e:
        return str(e)

print("Elevator:", get_pexels_video("elevator"))
print("Skincare:", get_pexels_video("skincare"))
print("Corporate tech:", get_pexels_video("corporate tech"))
print("AI data:", get_pexels_video("artificial intelligence abstract"))
