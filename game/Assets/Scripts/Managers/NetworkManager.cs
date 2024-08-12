using System.Runtime.InteropServices;
using UnityEngine;

public class NetworkManager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void UnityToReact(int score, bool isGameEnd);

    public string playTimeTxt;
    public string poseData;
    public int mapNum = 1;
    public int finalScore;

    void Awake()
    {
        Application.targetFrameRate = -1;
    }

    public void ReactToUnity(int num)
    {
        mapNum = num;
    }

    public void ReactToUnity(string data)
    {
        poseData = data;
    }

    public void UnityCall(bool isEnded)
    {
        // 해당 코드가 WebGL 빌드에서만 실행되도록 보장
#if UNITY_WEBGL == true && UNITY_EDITOR == false
        UnityToReact(finalScore, isEnded);
#endif
    }
}