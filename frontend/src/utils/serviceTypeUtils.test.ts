import { describe, it, expect } from "vitest";
import { ServiceType } from "../types/ServiceType";
import { ServiceTypeName } from "./serviceTypeUtil";

describe('print serviceType in the correct way', () => {
  it('should split serviceType and start with a big letter', () => {
    expect(ServiceTypeName(ServiceType.BrakeMaintenance)).toEqual("Brake maintenance")
    expect(ServiceTypeName(ServiceType.ChainReplacement)).toEqual("Chain replacement")
    expect(ServiceTypeName(ServiceType.WheelAdjustment)).toEqual("Wheel adjustment")
  })
})