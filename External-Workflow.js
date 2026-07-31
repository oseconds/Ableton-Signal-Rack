graph LR
    %% 스타일 정의 (Ableton 컬러 톤 차용)
    classDef ableton fill:#1C1C1C,stroke:#00D2FF,stroke-width:2px,color:#FFF;
    classDef conn fill:#3A3A3A,stroke:#AAAAAA,stroke-width:1px,color:#FFF,stroke-dasharray: 5 5;
    classDef external fill:#1E1E24,stroke:#FF9900,stroke-width:2px,color:#FFF;
    classDef hw fill:#2A2A2A,stroke:#00FF88,stroke-width:2px,color:#FFF;

    %% --------------------------------------------------
    %% 1. Ableton Live (Tempo Source)
    %% --------------------------------------------------
    subgraph Ableton["Ableton Live"]
        BPM[Master BPM]:::ableton
        Track[Audio/MIDI Track]:::ableton
    end

    %% --------------------------------------------------
    %% 2. Network Interface (Latency)
    %% --------------------------------------------------
    NetInterface{{MIDI Sync / OSC Message}}:::conn

    %% --------------------------------------------------
    %% 3. External Processing (TouchDesigner)
    %% --------------------------------------------------
    subgraph TD["TouchDesigner (Compute Interface)"]
        direction TB
        RecVal[Receive Master Data]:::external
        Process["Compute Curve / Smooth / Delay
        (External CPU Load)"]:::external
        Map[Map to HW Protocol]:::external
    end

    %% --------------------------------------------------
    %% 4. HW Protocol & Destination
    %% --------------------------------------------------
    HWProto{{DMX / Serial / Socket}}:::conn
    HW[Robot / Light HW]:::hw

    %% --------------------------------------------------
    %% 데이터 흐름 연결
    %% --------------------------------------------------
    BPM ==>|Message Rate| NetInterface
    Track -.-|MIDI Notes| NetInterface
    
    NetInterface ==> RecVal
    RecVal ==> Process
    Process ==> Map
    
    Map ==>|High Bandwidth| HWProto
    HWProto ==> HW

    %% 설명 및 범례
    classDef legend fill:none,stroke:none,color:#888,font-size:11px;
    Legend1[Double Solid Line: High-Bandwidth / Continuous Data]:::legend
    Legend2[Dashed Line: Non-continuous Message / Notes]:::legend
