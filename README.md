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

# Existing Workflow

A single musical movement often needs to control multiple destinations.

For example:

- Filter opening
- Light intensity change
- Robot movement
- Camera motion


However, each destination usually requires its own automation lane.


```
ONE MUSICAL MOVEMENT


        │
        ▼


┌─────────────────────┐
│  Filter Cutoff      │
│                     │
│  ________********** │
│                     │
└─────────────────────┘


┌─────────────────────┐
│  Light Brightness   │
│                     │
│  ****______________ │
│                     │
└─────────────────────┘


┌─────────────────────┐
│  Robot Position     │
│                     │
│  ___****____********│
│                     │
└─────────────────────┘


┌─────────────────────┐
│  Camera Movement    │
│                     │
│  _________////***** │
│                     │
└─────────────────────┘
```


Although these lanes represent the same musical intention, they become separate data to manage.

Each destination requires its own:

- Automation editing
- Range adjustment
- Curve design
- Smoothing
- Timing correction


Changing the original idea means modifying multiple lanes again.

---

# Signal Rack Workflow

Signal Rack separates the **source signal** from its **interpretation**.

Instead of creating multiple independent automations, create one reusable Master Signal.

Each destination receives its own Signal FX Chain.


```
ONE MUSICAL MOVEMENT


        │
        ▼


┌─────────────────────┐
│    MASTER SIGNAL    │
│                     │
│  ________********** │
│                     │
└─────────────────────┘


        │


 ┌──────┼────────┬────────┐
 │      │        │        │


 ▼      ▼        ▼        ▼


FILTER LIGHT   ROBOT   CAMERA


Smooth Smooth  Delay   Curve

Curve  Jitter  Curve   Remap

       Wet30%



 ▼      ▼        ▼        ▼


___////  ****~~~  __////  ***__


        │


        ▼


 Different outputs.

 Same source signal.
```

The source remains consistent.

Each destination creates its own interpretation.

---

# Core Concept

Signal Rack is not about replacing Automation.

It is about adding a processing layer between:

```
Automation

      │

      ▼

Signal Processing

      │

      ▼

Parameter / System Output
```


A single musical movement can become:

- A smooth filter transition
- A noisy lighting modulation
- A delayed robotic movement
- A quantized visual trigger


without creating separate automation data for every destination.