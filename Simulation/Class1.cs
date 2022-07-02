namespace Simulation;

public class Engine<T> {
  private int CurrentTick = 0;
  private List<T> SimulationHistory;

  public Engine(T defaultState) {
    SimulationHistory = new List<T> { defaultState };
  }

  public T GetStateAtTick(int tick) {
    if (tick < SimulationHistory.Count) {
      return SimulationHistory[tick];
    } else {
      return GenerateNextTick();
    }
  }

  public T GenerateNextTick() {
    throw new NotImplementedException();
  }
}

public class SimulationState {

}