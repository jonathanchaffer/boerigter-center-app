import { AlumContactInfo } from "components";
import { shallow } from "enzyme";
import { CuratedAlum } from "models";
import React from "react";

describe("AlumContactInfo", () => {
  it("display the contact info for an alum", () => {
    // Mock up a dummy alum
    const testAlum: CuratedAlum = {
      bio: "",
      company: "",
      display: true,
      email: "jane.doe@example.com",
      firstName: "Jane",
      gradYear: 0,
      id: "",
      lastName: "Doe",
      location: "",
      majors: [],
      phone: "5555555555",
    };

    // Shallow render the AlumContactInfo component
    const wrapper = shallow(<AlumContactInfo alum={testAlum} />);
    // Find the <span>s within the component
    const spans = wrapper.find("span");
    expect(spans).toHaveLength(2);
    // Check the contents of each span
    expect(shallow(spans.get(0)).text()).toContain("jane.doe@example.com");
    expect(shallow(spans.get(1)).text()).toContain("(555) 555-5555");
  });
});
