import ScriptWizard from "../features/ScriptGen/ScriptWizard";

const ScriptGen = () => (
  <div className="flex flex-col gap-8 px-8 py-8">
    <h2 className="text-2xl font-semibold">Script Generator</h2>
    <ScriptWizard />
  </div>
);

export default ScriptGen;
