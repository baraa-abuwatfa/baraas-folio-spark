import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/inquiry-schema";
const valid = {
  service: 5,
  title: "Website QA review",
  description: "Review the navigation and checkout experience.",
  timeline: "",
  budget: "",
  name: "Test Visitor",
  email: "visitor@example.com",
  website: "",
  submissionId: "9b1bf1a6-e677-4a86-b71a-0c67cb852692",
  confirmed: true,
};
describe("Portfolio inquiry validation", () => {
  it("accepts a complete explicitly confirmed inquiry", () =>
    expect(inquirySchema.safeParse(valid).success).toBe(true));
  it.each([
    { email: "invalid" },
    { service: 8 },
    { title: "" },
    { description: "short" },
    { name: "" },
    { confirmed: false },
    { website: "spam.example" },
  ])("rejects incomplete, unconfirmed or spam input %j", (override) =>
    expect(inquirySchema.safeParse({ ...valid, ...override }).success).toBe(false),
  );
});
