using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class GameScene_backup : MonoBehaviour
{
    private UDPReceive udpr;
    public int stage;
    public float playTime;
    public Text playTimeTxt;
    public Text scoreTxt;
    public Text stageTxt;
    private int score = 0;

    // 충돌한 오브젝트 리스트와 점수 획득 여부 저장
    public List<GameObject> colliders = new List<GameObject>();
    public bool getPoint = false;

    // 초기 설정 수행
    void Start()
    {
        udpr = transform.GetComponent<UDPReceive>();
    }

    // 점수 업데이트
    public void UpdateScore()
    {
        // 충돌한 오브젝트가 9개 이상일 경우 점수 10 증가 (perfect)
        if (colliders.Count >= 9)
        {
            getPoint = true;
            score += 10;
            GameManager.Instance.finalScore = score;
        }
        // 충돌한 오브젝트가 6개 이상일 경우 점수 5 증가 (good)
        else if (colliders.Count >= 6)
        {
            getPoint = true;
            score += 5;
            GameManager.Instance.finalScore = score;
        }
        // 충돌한 오브젝트가 3개 이상일 경우 점수 3 증가 (soso)
        else if (colliders.Count >= 3)
        {
            getPoint = true;
            score += 3;
            GameManager.Instance.finalScore = score;
        }
    }

    void Update()
    {
        playTime += Time.deltaTime;

        // 일정 시간 이상이 되면 게임 종료 (5분)
        if (playTime >= 10)
        {
            GameManager.Instance.playTime = playTime;
            GameManager.Instance.playTimeTxt = playTimeTxt.text;
            // udpr.UDPClose();
            GameManager.Instance.ToScore();
        }
    }

    private void LateUpdate()
    {
        // upper UI
        scoreTxt.text = string.Format("{0:n0}", score);
        stageTxt.text = string.Format("{0:0}", stage);

        int hour = (int)(playTime / 3600);
        int min = (int)((playTime - hour * 3600) / 60);
        int second = (int)(playTime % 60);
        playTimeTxt.text = string.Format("{0:00}", hour) + ":" + string.Format("{0:00}", min) + ":" + string.Format("{0:00}", second);
    }
}
