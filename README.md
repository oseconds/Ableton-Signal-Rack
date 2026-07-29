# Signal Rack
## Control Signal Processing Layer for Ableton Live

---

# Overview

Signal Rack은 Ableton Live 안에서 Control Signal을 Audio Signal처럼 다루기 위한 Signal Processing Layer이다.

Automation과 Modulation 사이에 새로운 Control Layer를 추가하여,
기존 Parameter 제어 방식을 확장한다.

Audio Effect Rack처럼 Control Signal을:

- Process
- Transform
- Route
- Reuse

할 수 있도록 설계한다.

하나의 음악적 움직임을 Audio, Visual, Hardware 시스템 전체로 확장하는 것을 목표로 한다.

---

# Table of Contents

## Part 1 — Concept
- Why Signal Rack
- Main Concept
- Core Philosophy

## Part 2 — Signal FX
- Smooth
- Curve
- Jitter
- Delay
- Quantize
- Remap
- Normalize

## Part 3 — Real-world Examples
- Lighting Control
- Robot Motion
- TouchDesigner Integration
- Arduino / Hardware
- Shared Signal Architecture
- Motion Presets

## Part 4 — Technical Architecture
- Max for Live
- Signal Engine
- Svelte + Vite GUI
- External Integration
- Roadmap
- Vision

---

# Part 1 — Concept

---

# Why Signal Rack

Ableton Live provides powerful tools for controlling parameters through:

- Automation
- Modulation
- Macro Mapping
- LFO
- Envelope


However, when working with Audio Visual systems or interactive environments, control data becomes difficult to manage.


Common problems:

- A single movement is difficult to share across multiple parameters and systems.
- Automation is difficult to reinterpret and reuse after it is created.
- Signal flow is difficult to visualize and manage like TouchDesigner CHOP.
- Musical timing and movement behavior are difficult to separate.
- Audio, Visual, and Hardware control require different workflows.


For example, one Drop section may need to control:

- Filter Cutoff
- Lighting
- Robot Motion
- Camera Movement
- TouchDesigner Visual
- OSC Output


Without a shared signal layer, each destination requires its own automation and mapping.

The same musical idea is recreated multiple times.

---

# The Idea

Signal Rack introduces a new Control Signal Processing Layer between Automation and Destination Parameters.


Instead of treating Automation as a final parameter value,
Signal Rack treats it as a reusable Control Signal.


    Automation Source


            |


            ▼


    Signal Processing


            |


            ▼


    Multiple Destinations


A single musical movement can be processed and interpreted differently depending on its destination.

---

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

# Part 2 — Signal FX

---


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


# Core Philosophy


Signal Rack extends the concept of Audio Effects into Control Signal Processing.


Audio Workflow:


    Audio Signal

          |

          ▼

          EQ

          |

          ▼

      Compressor

          |

          ▼

        Delay


Control Signal Workflow:


    Automation

          |

          ▼

        Smooth

          |

          ▼

         Curve

          |

          ▼

        Jitter

          |

          ▼

        Remap


The goal is not to create more automation.

The goal is to create a reusable language for movement

---
# Signal FX

Signal Rack processes Control Signals through modular Signal Effects.

Each Signal FX changes the behavior of a signal without changing the original source.

The concept is similar to Audio Effects:

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
```


Signal Rack applies the same idea to Control Signals:

```
Control Signal

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
```

---

# Smooth

Smooth reduces sudden changes in a signal.

Useful for:

- Robot motion
- Lighting fade
- Camera movement
- Mechanical control


Input:

```
127 |                  ***************
    |                  *
    |                  *
  0 |******************_______________
```


Smooth 70%:

```
127 |             ________************
    |          ___/
    |       __/
  0 |******___________________________
```


A sudden parameter change becomes continuous movement.

---

# Curve

Curve changes the response shape of a signal.

The same automation can create different motion characteristics.

Examples:

- Fast start, slow finish
- Slow start, fast finish
- Natural acceleration
- Mechanical response


Linear:

```
00000000000000011111111111111122222222
```


Ease In:

```
0000000000000000011223345567788999999
```


Ease Out:

```
0000112233445566778889999999999999999
```


Curve changes the feeling of movement without changing the original timing.

---

# Jitter

Jitter adds controlled variation to a signal.

Unlike random modulation,
Jitter is a processed layer applied on top of the original movement.

Parameters:

- Amount
- Speed
- Wet/Dry


Input:

```
127 |                  ***************
    |                  *
  0 |******************_______________
```


Jitter:

```
127 |             ~~~~********~~~~*****
    |          ~~    *      ~~ 
  0 |*********________________________
```


Applications:

- Organic lighting
- Natural motion
- Glitch effects
- Visual instability

---

# Jitter Wet

Wet controls how much of the processed signal is mixed with the original.

## Wet 0%

Original signal only.

```
127 |                  ***************
    |                  *
  0 |******************_______________
```


## Wet 30%

Original movement remains dominant.

Small variations are added.

```
127 |                ~~***************
    |             ~~~ *
    |          ~~~
  0 |**********_______________________
```


## Wet 100%

The signal is heavily controlled by the jitter process.

```
127 |       ~~~~********~~~~~~****~~~
    |    ~~~              ~~~
    | ~~~
  0 |~~~______________________________
```


The same automation can become:

- Stable movement
- Organic movement
- Unstable movement

depending on Wet amount.

---

# Delay

Delay offsets a signal in time.

Useful for creating:

- Sequential reactions
- Layered motion
- Mechanical timing differences


Input:

```
127 |                  ***************
    |                  *
  0 |******************_______________
```


Delay:

```
127 |                        ***************
    |                        *
  0 |************************_______________
```


Example:

```
Music Event

      │

      ▼

Light

      │

      ▼

Robot

      │

      ▼

Camera
```


One event can create multiple responses over time.

---

# Remap

Remap changes the relationship between Input and Output values.

Instead of changing the source signal,
Remap changes how the signal is interpreted.

Examples:

- MIDI value → Filter frequency
- Automation → Servo angle
- Audio level → Visual scale
- Control signal → Hardware range


## Original Mapping

Input and Output have the same range.

```
Output

127 |                         *
    |
    |
 64 |              *
    |
    |
  0 |*________________________________

     0        64       127

              Input
```


## Compressed Range

Input still reaches 127,
but output is limited.

```
Output

127 |
    |
 64 |
    |                         *
 32 |              *
    |
  0 |*________________________________

     0        64       127

              Input
```


## Inverted Mapping

The signal direction changes.

```
Output

127 |*
    |
    |
 64 |              *
    |
    |
  0 |                         *

     0        64       127

              Input
```


Remap allows one signal to communicate with different systems.

---

# Normalize

Normalize converts different signal scales into a consistent format.


Example:


```
MIDI CC

0 ───────────────── 127


          │


          ▼


Normalized Signal

0.0 ─────────────── 1.0
```


or:


```
Audio Level

-60dB ───────────── 0dB


          │


          ▼


Control Signal

0.0 ─────────────── 1.0
```


Normalization allows different signal sources to work inside the same system.

---

# Quantize

Quantize converts continuous movement into discrete steps.


Before:

```
000000111223344556677889999999
```


After:

```
000000000111111111222222222333
```


Useful for:

- Step lighting
- Beat synchronized motion
- Trigger systems
- Digital-style movement


---

# Signal FX Chain

Signal Effects can be combined like an Audio Effect Rack.

Example:

```
MASTER SIGNAL


***************________________


        │


        ▼


Smooth 70%


        │


        ▼


Curve Ease In Out


        │


        ▼


Jitter Wet 20%


        │


        ▼


OUTPUT


****////~~~~****************
```


Different chains create different interpretations of the same source signal.

---

# Signal Translation

Signal FX does not only modify values.

It translates behaviors between different systems.

A single control signal can become:

```
Automation

      │

      ▼

Filter Movement


Automation

      │

      ▼

Lighting Pattern


Automation

      │

      ▼

Robot Motion


Automation

      │

      ▼

Visual Interaction
```


The goal is not more modulation.

The goal is a reusable language for movement.


---

# Part 3 — Real-world Examples

Signal Rack is designed for situations where one musical idea needs to control multiple systems.

A single Automation or Modulation Source can become:

- Audio Parameter Movement
- Lighting Control
- Robot Motion
- Visual Interaction
- Hardware Behavior

Instead of rebuilding the same movement for each system,
Signal Rack creates one shared Control Signal and lets each destination interpret it differently.

---

# Example 1 — Lighting Control

## Music → Light

A common performance workflow:

A musical event happens.

The filter opens.

The lights increase.

The stage changes.


Without Signal Rack:

    MUSIC EVENT

          |
          |
          +──────────── Filter Automation
          |
          |
          +──────────── Light Automation
          |
          |
          +──────────── Visual Automation


Each system requires independent adjustment.


With Signal Rack:

    MASTER SIGNAL


    ***************________________


              |
              |
              ▼


        LIGHT CHAIN


        Smooth 80%

        Curve Ease Out

        Jitter Wet 15%


              |
              |
              ▼


        LED BRIGHTNESS


        0%________________100%


The same musical movement becomes a lighting performance signal.


Possible applications:

- LED strip control
- DMX lighting
- Stage brightness
- Interactive installation lighting

---

# Example 2 — Robot Motion

## Music → Physical Movement

Mechanical systems require different behavior from audio parameters.

A filter can instantly jump.

A robot cannot.


Signal Rack allows motion-specific processing.


    MASTER SIGNAL


    ***************________________


              |
              |
              ▼


        ROBOT CHAIN


        Smooth 90%

        Curve Slow

        Delay 1/4


              |
              |
              ▼


        SERVO POSITION


        0°________________180°



The same automation can become:


    Audio

    Fast response


        ↓


    Robot

    Slow physical movement


Signal processing becomes a Motion Profile.


Possible applications:

- Servo motor
- Robotic arm
- Mechanical sculpture
- Kinetic installation

---

# Example 3 — TouchDesigner Integration

## Ableton → TouchDesigner

TouchDesigner uses CHOP-based signal processing.

Signal Rack brings similar signal-flow thinking into Ableton.


Workflow:


    Ableton Automation


            |

            |

            ▼


       Signal Rack


            |

            |

            ▼


            OSC


            |

            |

            ▼


    TouchDesigner CHOP


            |

            |

            ▼


      Visual System



Example:


    MASTER SIGNAL


    ***************________________


            |

            |

            +──────── Particle Amount

            |

            +──────── Camera Movement

            |

            +──────── Shader Distortion

            |

            +──────── Geometry Scale



Each visual parameter can receive its own processing chain.


Example:


    Particle

    Jitter


    Camera

    Smooth + Delay


    Shader

    Remap


---

# Example 4 — Arduino / Hardware Control

## Ableton → Physical World

Signal Rack can extend Ableton into hardware systems.


Workflow:


    Ableton Live


          |

          |

          ▼


      Max for Live


          |

          |

          ▼


    OSC / MIDI / Serial


          |

          |

          ▼


       Arduino


          |

          |

          ▼


       Hardware



Example:


    Music Volume


          |

          |

          ▼


     Signal Rack


          |

          |

          ▼


        Remap


     0 - 127


          |

          |

          ▼


    Servo Angle


      0 - 180°



Applications:

- Moving sculpture
- Robotic installation
- Interactive object
- Sensor-based performance

---

# Example 5 — Shared Signal Architecture

The core idea of Signal Rack:

One source.

Multiple interpretations.


    MASTER SIGNAL


    ***************________________


                |

                |

        ┌───────┼────────┐
        |       |        |
        ▼       ▼        ▼


      AUDIO   LIGHT    ROBOT


     Smooth  Jitter   Delay

     Curve   Wet 30%  Remap


        ▼       ▼        ▼


    Filter   LED      Servo

    Cutoff   Pattern  Motion



The source remains identical.

The processing defines the behavior.

---

# Example 6 — Motion Presets

Signal processing can be saved as reusable Motion Presets.

Instead of storing only values,
Signal Rack stores movement behavior.

---

# Mechanical

For machines and precise movement.


    Smooth       High

    Curve        Linear

    Jitter       0%

    Delay        Short


Result:


    ________////********

   
---

# Organic

For natural movement.


    Smooth       Medium

    Curve        Ease

    Jitter       20%

    Wet          30%


Result:


    ____////~~~********


---

# Cinematic

For slow dramatic motion.


    Smooth       High

    Curve        Slow

    Delay        Long

    Jitter       Low


Result:


    ___________////********


---

# Beyond Modulation

Signal Rack is not only a modulation tool.

It is a way to design movement.


The same musical intention can become:

- Sound
- Light
- Motion
- Visuals
- Physical Interaction


through one shared Signal language.


---

# Part 4 — Technical Architecture

Signal Rack is designed as a layered system.

The goal is to separate:

- Signal Processing
- Ableton Integration
- User Interface
- External Communication


Architecture:


    Ableton Live


          |

          |

          ▼


    Max for Live


          |

          |

          ▼


    Signal Processing Engine


          |

          |

          ▼


    Signal Routing Layer


          |

          |

          +───────────────+
          |               |
          ▼               ▼


     Ableton Params     External Systems


                         OSC

                         MIDI

                         Serial

                         TouchDesigner

                         Arduino

---

# Max for Live

Max for Live is the core processing environment.

It handles:

- Signal generation
- Signal transformation
- Live parameter mapping
- Automation reading
- Device communication


Core components:


    Live API

    |

    +── Parameter Access

    +── Device Control

    +── Automation Data


    Max/MSP

    |

    +── Signal Processing

    +── Mapping Logic

    +── Routing


    pattr / dict

    |

    +── Preset Storage

    +── Signal State Management


---

# Signal Engine

The Signal Engine processes values as reusable objects.


Example:


    Input Signal


    ***************________________


            |

            |

            ▼


    Signal Processor


    Smooth

    Curve

    Jitter

    Delay

    Remap


            |

            |

            ▼


    Processed Signal


    ****////~~~********


Each Signal contains its own processing chain.

---

# Signal Data Structure

A Signal is not just a value.

It is a value with behavior.


Example:


    Signal


    {

      value:

      range:

      smoothing:

      curve:

      jitter:

      delay:

      quantize:

      mapping:

    }


This allows the same signal to be reused across different systems.

---

# GUI Architecture

## Svelte + Vite


Signal Rack uses Svelte + Vite for the interface layer.


Why Svelte:

- Lightweight
- Fast development
- Component-based UI
- Suitable for real-time visualization


GUI responsibilities:


    Signal Graph


    +──────────────+

    | Input Signal |

    +──────────────+

            |

            ▼

    +──────────────+

    | Smooth       |

    +──────────────+

            |

            ▼

    +──────────────+

    | Curve        |

    +──────────────+

            |

            ▼

    Output


Possible features:

- Signal Flow Editor
- FX Chain View
- Curve Editor
- Motion Presets
- Real-time Signal Visualization

---

# Max ↔ GUI Communication

The system separates processing and visualization.


Architecture:


    Svelte GUI


          |

          |

          ▼


    Communication Layer


          |

          |

          ▼


    Max for Live


          |

          |

          ▼


    Ableton Live



Possible communication methods:

- WebSocket
- OSC
- Max messages
- Shared state data


The GUI does not process the signal.

It controls and visualizes the Signal Engine.

---

# External Integration

Signal Rack can communicate with external systems.


## TouchDesigner


    Signal Rack


          |

          ▼


          OSC


          |

          ▼


    TouchDesigner CHOP


          |

          ▼


    Visual System



---

## Arduino / Hardware


    Signal Rack


          |

          ▼


    MIDI / OSC / Serial


          |

          ▼


    Arduino


          |

          ▼


    Physical Motion



---

# Development Roadmap


## Phase 1 — Signal Core

Goal:

Build the fundamental Signal Processing Layer.


Features:

- Signal Value System
- Smooth
- Curve
- Remap
- Delay
- Quantize


---

## Phase 2 — Max for Live Integration

Goal:

Connect Signal Processing with Ableton.


Features:

- Automation Input
- Macro Mapping
- Device Parameter Control
- Live API Integration
- Preset System


---

## Phase 3 — Signal Graph Interface

Goal:

Create a visual workflow.


Features:

- Svelte + Vite GUI
- Signal Node View
- FX Chain Editor
- Real-time Graph Display


---

## Phase 4 — External Systems

Goal:

Expand Signal Rack beyond Ableton.


Features:

- OSC Output
- MIDI Output
- Serial Communication
- TouchDesigner Integration
- Arduino / Hardware Control


---

## Phase 5 — Motion Library


Goal:

Create reusable movement behaviors.


Examples:


    Mechanical

    Smooth High

    Curve Linear

    Jitter Off



    Organic

    Smooth Medium

    Curve Ease

    Jitter 20%



    Cinematic

    Delay Long

    Curve Slow

    Jitter Low



---

# Vision

Signal Rack is not another modulation device.

It is a Control Signal Infrastructure for creative systems.


Automation is the source.

Signal Processing is the language.

Every system interprets the same movement differently.


One movement.

Multiple interpretations.


Sound.

Light.

Motion.

Visuals.

Physical Interaction.


Signal Rack aims to create a unified workflow where musical ideas can move beyond the timeline and become a shared language between digital and physical systems.