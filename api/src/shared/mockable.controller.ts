export abstract class MockableController {
  /**
   * Simulates a response by adding a delay
   */
  protected simulateResponse<T>(assembleData: () => T, delay: number = 300) {
    return new Promise<T>((resolve) => {
      setTimeout(() => resolve(assembleData()), delay);
    });
  }
}