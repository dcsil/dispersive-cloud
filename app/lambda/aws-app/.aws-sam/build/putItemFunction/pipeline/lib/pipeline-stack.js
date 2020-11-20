"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStack = void 0;
const cdk = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
const codecommit = require("@aws-cdk/aws-codecommit");
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const codebuild = require("@aws-cdk/aws-codebuild");
class PipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const artifactsBucket = new s3.Bucket(this, "ArtifactsBucket");
        // The code that defines your stack goes here
        // Import existing CodeCommit sam-app repository
        const codeRepo = codecommit.Repository.fromRepositoryName(this, 'AppRepository', // Logical name within CloudFormation
        'aws-app' // Repository name
        );
        // Pipeline creation starts
        const pipeline = new codepipeline.Pipeline(this, 'Pipeline', {
            artifactBucket: artifactsBucket
        });
        // Declare source code as an artifact
        const sourceOutput = new codepipeline.Artifact();
        // Add source stage to pipeline
        pipeline.addStage({
            stageName: 'Source',
            actions: [
                new codepipeline_actions.CodeCommitSourceAction({
                    actionName: 'CodeCommit_Source',
                    repository: codeRepo,
                    output: sourceOutput,
                }),
            ],
        });
        // Declare build output as artifacts
        const buildOutput = new codepipeline.Artifact();
        // Declare a new CodeBuild project
        const buildProject = new codebuild.PipelineProject(this, 'Build', {
            environment: { buildImage: codebuild.LinuxBuildImage.AMAZON_LINUX_2_2 },
            environmentVariables: {
                'PACKAGE_BUCKET': {
                    value: artifactsBucket.bucketName
                }
            }
        });
        // Add the build stage to our pipeline
        pipeline.addStage({
            stageName: 'Build',
            actions: [
                new codepipeline_actions.CodeBuildAction({
                    actionName: 'Build',
                    project: buildProject,
                    input: sourceOutput,
                    outputs: [buildOutput],
                }),
            ],
        });
    }
}
exports.PipelineStack = PipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsc0NBQXVDO0FBQ3ZDLHNEQUF1RDtBQUN2RCwwREFBMkQ7QUFDM0QsMEVBQTJFO0FBQzNFLG9EQUFxRDtBQUVyRCxNQUFhLGFBQWMsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMxQyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sZUFBZSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMvRCw2Q0FBNkM7UUFDN0MsZ0RBQWdEO1FBQ2hELE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQ3ZELElBQUksRUFDSixlQUFlLEVBQUUscUNBQXFDO1FBQ3RELFNBQVMsQ0FBQyxrQkFBa0I7U0FDN0IsQ0FBQztRQUVGLDJCQUEyQjtRQUMzQixNQUFNLFFBQVEsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUMzRCxjQUFjLEVBQUUsZUFBZTtTQUNoQyxDQUFDLENBQUM7UUFFSCxxQ0FBcUM7UUFDckMsTUFBTSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakQsK0JBQStCO1FBQy9CLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDaEIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsT0FBTyxFQUFFO2dCQUNQLElBQUksb0JBQW9CLENBQUMsc0JBQXNCLENBQUM7b0JBQzlDLFVBQVUsRUFBRSxtQkFBbUI7b0JBQy9CLFVBQVUsRUFBRSxRQUFRO29CQUNwQixNQUFNLEVBQUUsWUFBWTtpQkFDckIsQ0FBQzthQUNIO1NBQ0YsQ0FBQyxDQUFDO1FBRUMsb0NBQW9DO1FBQ3hDLE1BQU0sV0FBVyxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhELGtDQUFrQztRQUNsQyxNQUFNLFlBQVksR0FBRyxJQUFJLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtZQUNoRSxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2RSxvQkFBb0IsRUFBRTtnQkFDcEIsZ0JBQWdCLEVBQUU7b0JBQ2hCLEtBQUssRUFBRSxlQUFlLENBQUMsVUFBVTtpQkFDbEM7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILHNDQUFzQztRQUN0QyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLE9BQU8sRUFBRTtnQkFDUCxJQUFJLG9CQUFvQixDQUFDLGVBQWUsQ0FBQztvQkFDdkMsVUFBVSxFQUFFLE9BQU87b0JBQ25CLE9BQU8sRUFBRSxZQUFZO29CQUNyQixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUN2QixDQUFDO2FBQ0g7U0FDRixDQUFDLENBQUM7SUFHTCxDQUFDO0NBQ0Y7QUE1REQsc0NBNERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHMzID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLXMzJyk7XG5pbXBvcnQgY29kZWNvbW1pdCA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1jb2RlY29tbWl0Jyk7XG5pbXBvcnQgY29kZXBpcGVsaW5lID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZScpO1xuaW1wb3J0IGNvZGVwaXBlbGluZV9hY3Rpb25zID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zJyk7XG5pbXBvcnQgY29kZWJ1aWxkID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWNvZGVidWlsZCcpO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG4gICAgY29uc3QgYXJ0aWZhY3RzQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCBcIkFydGlmYWN0c0J1Y2tldFwiKTtcbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcbiAgICAvLyBJbXBvcnQgZXhpc3RpbmcgQ29kZUNvbW1pdCBzYW0tYXBwIHJlcG9zaXRvcnlcbiAgICBjb25zdCBjb2RlUmVwbyA9IGNvZGVjb21taXQuUmVwb3NpdG9yeS5mcm9tUmVwb3NpdG9yeU5hbWUoXG4gICAgICB0aGlzLFxuICAgICAgJ0FwcFJlcG9zaXRvcnknLCAvLyBMb2dpY2FsIG5hbWUgd2l0aGluIENsb3VkRm9ybWF0aW9uXG4gICAgICAnYXdzLWFwcCcgLy8gUmVwb3NpdG9yeSBuYW1lXG4gICAgKTtcbiAgICBcbiAgICAvLyBQaXBlbGluZSBjcmVhdGlvbiBzdGFydHNcbiAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBjb2RlcGlwZWxpbmUuUGlwZWxpbmUodGhpcywgJ1BpcGVsaW5lJywge1xuICAgICAgYXJ0aWZhY3RCdWNrZXQ6IGFydGlmYWN0c0J1Y2tldFxuICAgIH0pO1xuICAgIFxuICAgIC8vIERlY2xhcmUgc291cmNlIGNvZGUgYXMgYW4gYXJ0aWZhY3RcbiAgICBjb25zdCBzb3VyY2VPdXRwdXQgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG4gICAgXG4gICAgLy8gQWRkIHNvdXJjZSBzdGFnZSB0byBwaXBlbGluZVxuICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgIHN0YWdlTmFtZTogJ1NvdXJjZScsXG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgIG5ldyBjb2RlcGlwZWxpbmVfYWN0aW9ucy5Db2RlQ29tbWl0U291cmNlQWN0aW9uKHtcbiAgICAgICAgICBhY3Rpb25OYW1lOiAnQ29kZUNvbW1pdF9Tb3VyY2UnLFxuICAgICAgICAgIHJlcG9zaXRvcnk6IGNvZGVSZXBvLFxuICAgICAgICAgIG91dHB1dDogc291cmNlT3V0cHV0LFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgXG4gICAgICAgIC8vIERlY2xhcmUgYnVpbGQgb3V0cHV0IGFzIGFydGlmYWN0c1xuICAgIGNvbnN0IGJ1aWxkT3V0cHV0ID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgpO1xuICAgIFxuICAgIC8vIERlY2xhcmUgYSBuZXcgQ29kZUJ1aWxkIHByb2plY3RcbiAgICBjb25zdCBidWlsZFByb2plY3QgPSBuZXcgY29kZWJ1aWxkLlBpcGVsaW5lUHJvamVjdCh0aGlzLCAnQnVpbGQnLCB7XG4gICAgICBlbnZpcm9ubWVudDogeyBidWlsZEltYWdlOiBjb2RlYnVpbGQuTGludXhCdWlsZEltYWdlLkFNQVpPTl9MSU5VWF8yXzIgfSxcbiAgICAgIGVudmlyb25tZW50VmFyaWFibGVzOiB7XG4gICAgICAgICdQQUNLQUdFX0JVQ0tFVCc6IHtcbiAgICAgICAgICB2YWx1ZTogYXJ0aWZhY3RzQnVja2V0LmJ1Y2tldE5hbWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIEFkZCB0aGUgYnVpbGQgc3RhZ2UgdG8gb3VyIHBpcGVsaW5lXG4gICAgcGlwZWxpbmUuYWRkU3RhZ2Uoe1xuICAgICAgc3RhZ2VOYW1lOiAnQnVpbGQnLFxuICAgICAgYWN0aW9uczogW1xuICAgICAgICBuZXcgY29kZXBpcGVsaW5lX2FjdGlvbnMuQ29kZUJ1aWxkQWN0aW9uKHtcbiAgICAgICAgICBhY3Rpb25OYW1lOiAnQnVpbGQnLFxuICAgICAgICAgIHByb2plY3Q6IGJ1aWxkUHJvamVjdCxcbiAgICAgICAgICBpbnB1dDogc291cmNlT3V0cHV0LFxuICAgICAgICAgIG91dHB1dHM6IFtidWlsZE91dHB1dF0sXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBcbiAgICBcbiAgfVxufVxuIl19