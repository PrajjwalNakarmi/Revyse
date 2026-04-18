import SoftwareTemplate from "./templates/SoftwareTemplate";
import DesignerTemplate from "./templates/DesignerTemplate";
import DataAnalystTemplate from "./Templates/DataAnalystTemplate";
import BusinessTemplate from "./Templates/BusinessTemplate";
import MinimalTemplate from "./Templates/MinimalTemplate";

export default function TemplateRenderer({ template, data, original }) {
  switch (template) {
    case "designer":
      return <DesignerTemplate data={data} />;

    case "software":
      return <SoftwareTemplate data={data} />;

    case "data":
      return <DataAnalystTemplate data={data} />;

    case "business":
      return <BusinessTemplate data={data} />;

    case "minimal":
      return <MinimalTemplate data={data} />;

    case "original":
    default:
      return original;
  }
}