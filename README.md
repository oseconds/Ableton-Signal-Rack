# Signal Rack
## Control Signal Processing Layer for Ableton Live

---

# Overview

Signal Rack은 Ableton Live 안에서 Control Signal을 Audio Signal처럼 다루기 위한 Signal Processing Layer이다.

기존 Ableton에서는 Automation, Macro, LFO, Envelope 등을 통해 Parameter를 제어할 수 있지만, Audio Visual 작업이나 Interactive System에서는 Control Signal을 관리하는 새로운 방식이 필요하다.

Signal Rack은 Automation과 Modulation 사이에 Signal Processing Layer를 추가한다.

Audio Effect Rack처럼 Control Signal을:

- Process
- Transform
- Route
- Reuse

할 수 있도록 설계한다.

기존의 Parameter 제어 방식을 확장하여,
하나의 음악적 움직임을 Audio, Visual, Hardware 시스템 전체로 확장하는 것을 목표로 한다.

---

# Why?

Ableton Live는 Automation과 Modulation을 통해 강력한 Parameter 제어 환경을 제공한다.

하지만 Audio Visual 작업이나 Interactive System에서는 다음과 같은 한계가 발생한다.

- 하나의 움직임을 여러 Parameter와 시스템에서 공유하기 어렵다.
- Automation 이후의 값 변형 과정이 제한적이다.
- TouchDesigner CHOP과 같은 Signal Flow 기반 관리가 어렵다.
- 음악적 시간 구조 기반의 움직임 설계가 어렵다.
- Audio, Visual, Hardware Control을 하나의 Workflow 안에서 관리하기 어렵다.

예를 들어 하나의 Drop 구간이 다음을 동시에 제어한다고 생각하면:

- Filter Cutoff
- Lighting
- Robot Motion
- Camera Movement
- TouchDesigner Visual
- OSC Output

각각 별도의 Automation과 Mapping을 만들어야 한다.

같은 음악적 움직임이 여러 곳에서 반복된다.

---

# The Idea

Signal Rack은 Automation을 단순한 Parameter 값이 아닌,
재사용 가능한 Control Signal로 취급한다.

기존 Workflow:

```
Filter Automation

***************________________________


Light Automation

***************________________________


Robot Automation

***************________________________
```

Signal Rack Workflow:

```
MASTER SIGNAL

***************________________________
```

하나의 Signal을 여러 목적에 맞게 변형한다.

---

# Signal Rack

각 Output은 독립적인 Signal FX Chain을 가진다.

Source Signal은 유지되고,
각 목적에 맞는 방식으로 해석된다.


```
                              MASTER SIGNAL

                    ***************________________


                                   │

                                   ▼


                    +---------------------------+
                    |       SIGNAL RACK         |
                    +---------------------------+


          ┌────────────────┬────────────────┬────────────────┐
          │                │                │                │
          ▼                ▼                ▼                ▼


   FILTER CHAIN     LIGHT CHAIN      ROBOT CHAIN       OSC CHAIN


   Smooth           Smooth           Delay             Quantize

   Curve            Jitter           Curve             Normalize

                    Wet 30%           Remap             Scale


          │                │                │                │
          ▼                ▼                ▼                ▼


   ****////****     ***~~~*****     ____////****      **__**__


          │                │                │                │
          ▼                ▼                ▼                ▼


 Filter Cutoff    LED Brightness   Robot Motion    TouchDesigner
```

같은 Source Signal이라도:

- Filter는 부드러운 변화
- Light는 약간의 흔들림
- Robot은 느린 움직임
- OSC는 정량화된 데이터

처럼 서로 다른 결과를 만들 수 있다.

---

# Signal Processing Concept

Signal Rack은 Audio Effect Rack의 Workflow를 Control Signal에 적용한다.


Audio Processing:

```
Audio Signal

      │

      ▼

     EQ

      │

      ▼

 Compressor

      │

      ▼

    Delay

      │

      ▼

   Reverb

      │

      ▼

   Output
```


Control Signal Processing:

```
Automation

      │

      ▼

    Smooth

      │

      ▼

     Curve

      │

      ▼

    Jitter

      │

      ▼

    Delay

      │

      ▼

    Remap

      │

      ▼

Processed Signal
```

Audio Effect가 소리를 변화시키듯,
Signal Rack은 움직임을 변화시킨다.

---

# Automation is the Source

Signal Rack은 Ableton Automation을 대체하지 않는다.

Automation은 원본 Signal Source이며,
Signal Rack은 그 위에 적용되는 Processing Layer이다.


```
INPUT AUTOMATION


127 |                  ***************
    |                  *
    |                  *
  0 |******************_______________



              │

              ▼



SIGNAL FX


Smooth 70%

Curve Ease In Out

Jitter Wet 30%



              │

              ▼



PROCESSED SIGNAL


127 |             ~~~~~~~~*************
    |          ___////~~~~************
    |      ___////
  0 |*****____________________________
```

원본 Automation은 유지된다.

Signal Rack은 새로운 해석을 추가한다.

---

# Different Outputs, Different Interpretations

하나의 Automation을 수정하면 모든 Output이 함께 변화한다.

하지만 각 Output은 독립적인 Processing을 가진다.


```
MASTER AUTOMATION


***************________________________


                 │


                 ▼


        +----------------+
        | Signal Routing |
        +----------------+


                 │


      ┌──────────┼──────────┐
      │          │          │


      ▼          ▼          ▼


   FILTER      LIGHT      ROBOT


 Smooth       Smooth      Delay

 Curve        Jitter     Curve

              Wet 30%     Remap


      ▼          ▼          ▼


****////****  ***~~~***  ____////****
```


하나의 음악적 아이디어.

여러 개의 다른 움직임.

---

# Visual Language

README의 Signal 표현 기준:


```
************   Constant Value


____________   Baseline


///////////    Smooth / Curve


~~~~~~~~~~~    Jitter / Noise


│              Signal Flow


▼              Processing Stage
```

Signal Rack은 Control Data를 Audio Effect처럼 다루는 새로운 Workflow를 제안한다.
```