import updateCommand from './update';
import patchCommand from './patch';
import commitCommand from './commit';
import publishCommand from './publish';



const upcomlishCommand = async (
    packageName: string,
) => {
    console.log(`\n\t------------`);
    console.log(`\tUpcomlishing ${packageName}...`);

    await updateCommand(packageName);
    await patchCommand(packageName);
    await commitCommand(packageName);
    await publishCommand(packageName);

    console.log(`\n\tUpcomlished ${packageName}.`);
    console.log(`\t------------\n`);
}


export default upcomlishCommand;
