import updateCommand from './update';
import patchCommand from './patch';
import commitCommand from './commit';
import publishCommand from './publish';



const upcomlishCommand = async (
    packageName: string,
    configurationFile: string,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUpcomlishing ${packageName}...`);

    await updateCommand(packageName, configurationFile);
    await patchCommand(packageName, configurationFile);
    await commitCommand(packageName, configurationFile);
    await publishCommand(packageName, configurationFile);

    console.log(`\n\tUpcomlished ${packageName}.`);
    console.log(`\t---------------\n`);
}


export default upcomlishCommand;
