# Signal Rack
## Control Signal Processing Layer for Ableton Live

---

# Overview

Signal Rack은 Ableton Live 안에서 Control Signal을 Audio Signal처럼 다루기 위한 Signal Processing Layer이다.

기존 Ableton에서는 Automation, Macro, LFO, Envelope 등을 통해 Parameter를 제어할 수 있지만, Audio Visual 작업이나 Interactive System에서는 다음과 같은 한계가 있다.

- 하나의 움직임을 여러 Parameter와 시스템에서 공유하기 어렵다.
- Automation 이후의 값 변형 과정이 제한적이다.
- TouchDesigner CHOP처럼 Signal Flow를 관리하기 어렵다.
- 음악적 시간 구조 기반의 움직임 설계가 어렵다.
- Audio, Visual, Hardware Control을 하나의 Workflow 안에서 관리하기 어렵다.

Signal Rack은 Automation과 Modulation 사이에 새로운 Control Layer를 추가한다.

---

# Core Concept

## Audio Effect Rack → Control Signal Rack

Ableton의 Audio Workflow:

    Audio Signal

          |
          v

    EQ
    Compressor
    Delay
    Reverb

          |
          v

    Output


Signal Rack:

    Control Signal

          |
          v

    Math
    Remap
    Smooth
    Curve
    Delay
    Jitter
    Quantize

          |
          v

    Multiple Outputs


Audio Signal에 Effect Chain을 적용하듯,
Control Data에도 Processing Chain을 적용한다.

---

# Motivation

## TouchDesigner CHOP Workflow

TouchDesigner에서는 일반적으로:

    Audio / MIDI / Sensor

            |
            v

        CHOP Signal

            |
            v

    Math
    Lag
    Logic
    Analyze
    Null

            |
            v

    Visual / Hardware


형태로 데이터를 관리한다.

특히 Null CHOP은 단순 저장 공간이 아니라,
프로젝트 안에서 재사용 가능한 기준 Signal을 만드는 역할을 한다.

Signal Rack은 이와 같은 Signal 중심 Workflow를 Ableton 안으로 가져오는 것을 목표로 한다.

---

# Problem

## Current Ableton Workflow

일반적인 AV 작업:

    Automation

        |
        +---- Filter
        |
        +---- Light
        |
        +---- TouchDesigner
        |
        +---- Hardware


각 시스템마다 별도의 Mapping과 Processing이 필요하다.

예:

    Filter Cutoff Automation

    Light Brightness Automation

    Robot Motion Automation

    Camera Movement Automation


각각 따로 관리해야 하며,
하나의 음악적 움직임을 수정하기 어렵다.

---

# Signal Network Concept

Signal Rack은 Control Signal을 생성하고,
이를 여러 목적에 맞게 변형한다.

예:

    DROP_SIGNAL

            |
            v

    Signal Processing

            |
      +-----+-----+-----+
      |     |     |     |
      v     v     v     v

    Filter Light Robot Visual


각 Output은 독립적으로:

- Range
- Remap
- Invert
- Lag
- Delay
- Curve
- Jitter

를 적용할 수 있다.

---

# Automation as Source

Signal Rack은 기존 Automation을 대체하지 않는다.

Automation은 원본 데이터이며,
Signal Rack은 그 위에 적용되는 Processing Layer이다.


    Original Automation

            |
            v

       Signal Rack

            |
            v

     Processed Signal

            |
            v

        Output


원본 Automation을 수정하면
Processing 결과도 자동으로 변경된다.

비파괴적인 Workflow를 유지한다.

---

# Motion Processing

## Smooth

값의 변화를 부드럽게 만든다.

TouchDesigner의 Lag CHOP과 같은 역할.

Example:

    Before

    0 ---------------- 127


    After

    0 --------/-------- 127


Parameters:

- Amount
- Attack
- Release


---

## Curve

시간에 따른 움직임 형태를 변경한다.

비주얼 툴의 Speed Graph / F-Curve와 같은 개념.

Types:

- Linear
- Ease In
- Ease Out
- Ease In Out
- Bezier
- S Curve


Example:

    Linear

    0 ---------------- 127


    Ease In Out

    0 ----____---- 127


---

## Jitter

기존 Automation 위에 자연스러운 변화를 추가한다.

Example:

Original:

    50 ---------------- 100


Jitter:

    50 ~~~ 100 ~~~


Parameters:

- Amount
- Speed
- Smooth
- Wet / Dry


Audio Effect의 Wet/Dry처럼 적용 가능하다.

---

## Delay

Signal 변화의 시간을 이동한다.

Example:

    Input:

    0 ---------------- 100


    Delay:

    0 ------->-------- 100


음악 기준:

- 1/16
- 1/8
- 1/4
- 1 Bar


---

## Quantize

값 또는 시간을 음악 구조에 맞게 정렬한다.


Value:

    0.37

      |

      v

    0.25


Time:

    Free Movement

          |

          v

    1/8 Note
    1 Bar
    4 Bar


---

## Remap / Normalize

서로 다른 범위의 값을 변환한다.


Example:

Input:

    0 ~ 1


Output:

    0 ~ 127


또는:

    Frequency

    200Hz ~ 8000Hz


---

## Invert

Signal 방향을 반전한다.


Example:

    Original

    0 ------------ 127


    Invert

    127 ---------- 0


---

# Musical Control

Signal은 단순한 숫자가 아니라 음악 Timeline과 연결된다.


Example:

    Bar 1

    Position = 0


    Bar 5

    Position = 90


그대로 전송하면:

    0 ---------------- 90

    갑작스러운 변화


Signal Rack:

    Glide

    Length:
    4 Bar

    Curve:
    Ease In Out


결과:

    0 ---------------- 90

    자연스러운 음악적 움직임


활용:

- Robot Motion
- Lighting
- Camera Movement
- Visual Parameter

---

# Real World Examples

## Example 1
## Drop Intensity Control


Scenario:

공연에서 Drop 구간마다 여러 시스템이 동시에 변화한다.


Source:

    DROP_SIGNAL


Processing:

    Smooth

    Curve

    Delay


Output:

    Filter Cutoff

        Range:
        500Hz ~ 8kHz


    LED Brightness

        Range:
        0 ~ 100%


    Robot Arm

        Range:
        0 ~ 90 Degree


    TouchDesigner OSC

        Camera Movement


하나의 음악 구조를 수정하면
전체 시스템이 함께 변화한다.

---

## Example 2
## Robot Arm Control


Ableton Automation:

    Bar 1

    Position:
    0 Degree


    Bar 5

    Position:
    90 Degree


Signal Rack:

    Glide

    Time:
    4 Bar


    Curve:

    Ease In Out


Output:

    MIDI / OSC / Serial

            |

            v

        Hardware


음악 Timeline 안에서 물리 움직임을 설계할 수 있다.

---

## Example 3
## Automation Enhancement


Original:

    Filter Cutoff

    0 ---------------- 127


Signal Processing:

    Smooth:
    70%


    Curve:
    S Curve


    Jitter:
    10%


    Wet:
    30%


Result:

기본 Automation은 유지하면서
더 자연스럽고 유기적인 움직임 생성.

---

## Example 4
## Shared Signal


Signal:

    ENERGY


Output A:

    Filter Cutoff

    Range:
    200Hz ~ 10kHz


Output B:

    Light

    Invert

    0 ~ 100%


Output C:

    Robot

    Lag

    500ms


Output D:

    OSC

    TouchDesigner


하나의 Signal을 각 시스템의 언어로 변환한다.

---

# Signal Types


## Audio Rate

빠른 변화.

Examples:

- Audio Level
- Envelope
- Pitch


## Control Rate

일반적인 Parameter 제어.

Examples:

- Filter
- Effect Mix
- Macro


## Musical Rate

음악 Timeline 기반.

Examples:

- Beat
- Bar
- Scene Change


## Event Rate

Trigger 기반.

Examples:

- Marker
- Scene Change
- Hardware Event


---

# Output

Supported Targets:

    Ableton Parameter

    MIDI CC

    OSC

    Serial

    Arduino

    External Hardware


---

# Preset System

Audio Effect처럼 Motion Preset을 저장한다.


Example:

    Mechanical Slow Movement


Contains:

    Smooth:
    80%


    Curve:
    Ease Out


    Delay:
    1/4 Bar


    Jitter:
    5%


Reuse:

- Robot
- Camera
- Light
- Visual


---

# Development Roadmap


## Phase 1

M4L Prototype


Goal:

    Input Signal

          |

          v

    Processing Chain

          |

          v

    Ableton Parameter


Implementation:

- Automation Input
- LFO
- Math
- Remap
- Smooth
- Curve
- Output Mapping


---

## Phase 2

Signal Library


Reusable Signal Management.


Example:

    DROP_SIGNAL


Used By:

    Filter

    Robot

    Light

    Visual


---

## Phase 3

External Extension UI


Project-wide Signal Management.


Example:


    SIGNAL MAP


    DROP

      |
      +---- Filter

      +---- Light

      +---- Robot



    BEAT

      |
      +---- Camera

      +---- OSC


---

## Phase 4

Graph View


Signal Network Visualization:


    Signal

       |

       +---- Math

       |

       +---- Lag

       |

       +---- Output


Implementation Direction:

- Max/MSP backend
- Max API communication
- Svelte + Vite UI


---

# Final Goal

Signal Rack은 Ableton Live를 단순한 음악 제작 도구에서 확장하여,

Audio,
Visual,
Hardware,
Interactive System을

음악 Timeline 기반의 Control Signal Network로 연결하는 것을 목표로 한다.

Automation을 직접 그리는 것에서 끝나는 것이 아니라,

Signal을 생성하고,
가공하고,
재사용하고,
여러 시스템으로 확장하는 새로운 Control Workflow를 제공한다.