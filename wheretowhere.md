graph LR
    subgraph Input_Layer ["1. SOURCE INPUT"]
        direction TB
        AudioIn["Audio Input Stage"]
        AutomationIn["LOM Parameter Stage"]
        InternalLFO["Phasor Stage"]
    end

    subgraph Analysis_Layer ["2. SIGNAL ANALYSIS & NORM"]
        direction TB
        Follower["env~ / DSP Analysis"]
        Normalize["Scale & Smooth / MSP"]
    end

    subgraph Core_Layer ["3. TRANSFER MATRIX (gen~)"]
        direction TB
        CurveLook["Look-up Table / buffer~"]
        DSPProcessor["DSP: Smooth/Jitter/Delay"]
    end

    subgraph Output_Layer ["4. TARGET OUTPUT"]
        direction TB
        RemoteOut["live.remote~ / Priority 1"]
        OSCOut["UDP/JS / Exterior"]
    end

    %% 데이터 흐름
    Input_Layer --> Analysis_Layer
    Analysis_Layer -- "Normalized MSP Signal (0.-1.)" --> Core_Layer
    UI_CurveData["Svelte UI: Curve JSON"] -- "Fill buffer~" --> Core_Layer
    Core_Layer -- "Processed MSP Signal (-1. to 1.)" --> Output_Layer
